import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import Opt from './components/Opt';
import Show from './components/Show';
import Store from './store/store';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={Store}>
        <App>
            <Opt/>
            <Show/>
        </App>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
