import React, { useState } from 'react';
import { Epic } from '@vkontakte/vkui';
import get from 'lodash/get';
import '@vkontakte/vkui/dist/vkui.css';
import './assets/fonts/fonts.css';
import './assets/styles/main.scss';

// Views
import Home from './panels/Home';
import Note from './panels/Note';

// Components
import Tabbar from './components/tabbar';

const DEFAULT_STORY = 'home';

const app = () => {
	const [story, setStory] = useState(DEFAULT_STORY);

	/**
	 * @param {Object} event 
	 */
	const updateStory = event => {
		const story = get(event, 'currentTarget.dataset.story', DEFAULT_STORY);

		return setStory(story);
	};

	return (
		<Epic activeStory={story} tabbar={<Tabbar go={updateStory} selected={story} />}>
			<Note id="note" />
			<Home id="home" />
		</Epic>
	);
}

export default app;