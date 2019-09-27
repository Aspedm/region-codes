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

const DEFAULT_STORY = 'home';

const App = () => {
	const [story, setStory] = useState(DEFAULT_STORY);

	/**
	 * @param {String} scheme
	 */
	const VKWebAppUpdateConfig = scheme => {
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
					console.log('vkConnectEvent', e.detail.type);
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
			<Note id="note" />
			<Home id="home" />
			<Fines id="fines" />
		</Epic>
	);
}

export default App;
