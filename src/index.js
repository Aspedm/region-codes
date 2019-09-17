import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';
import App from './App';
import registerServiceWorker from './sw';

connect.send('VKWebAppInit', {});
registerServiceWorker();

const root = document.getElementById('root');
mVKMiniAppsScrollHelper(root);

ReactDOM.render(<App />, root);
