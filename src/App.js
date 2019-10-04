import React, { useState, useEffect } from 'react';
import { Epic } from '@vkontakte/vkui';
import vkConnect from '@vkontakte/vk-connect';
import get from 'lodash/get';
import '@vkontakte/vkui/dist/vkui.css';
import './assets/fonts/fonts.css';
import './assets/styles/main.scss';

// Views
import Home from './panels/Home';
import Note from './panels/Note';
import Fines from './panels/Fines';

// Components
import Tabbar from './components/tabbar';

// helpers
import { isDark } from './helpers';
import { DEFAULT_COLOR_SCHEME } from './configs';

const DEFAULT_STORY = 'home';

const App = () => {
	const [story, setStory] = useState(DEFAULT_STORY);
	const [colorScheme, setColorScheme] = useState(DEFAULT_COLOR_SCHEME);

	/**
	 * @param {String} scheme
	 * @returns {undefined}
	 */
	const VKWebAppUpdateConfig = scheme => {
		if (!isDark(scheme)) {
			vkConnect.send('VKWebAppSetViewSettings', {
				status_bar_style: 'light', 
				action_bar_color: '#8b44f7',
			});
		}

		setColorScheme(scheme);
		return document.getElementsByTagName('body')[0].setAttribute('scheme', scheme);
	}

	useEffect(() => {
		const vkEvents = vkConnect.subscribe(e => {
			switch(e.detail.type) {
				case 'VKWebAppUpdateConfig':
					const scheme = get(e, 'detail.data.scheme', 'client_light');
					VKWebAppUpdateConfig(scheme);
					break;
				default:
					console.log(e.detail.type, e.detail.data);
					break;
			}
		});

		return () => {
			vkConnect.unsubscribe(vkEvents);
		};
	}, [VKWebAppUpdateConfig]);

	/**
	 * @param {Object} event 
	 */
	const updateStory = event => {
		const story = get(event, 'currentTarget.dataset.story', DEFAULT_STORY);

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		return setStory(story);
	};

	return (
		<Epic 
			activeStory={story} 
			tabbar={
				<Tabbar go={updateStory} selected={story} />
			}>
			<Note id="note" scheme={colorScheme} />
			<Home id="home" scheme={colorScheme} />
			<Fines id="fines" scheme={colorScheme} />
		</Epic>
	);
}

export default App;
