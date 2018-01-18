import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import './css/main.css';
import './css/billingCss.css';
import { HashRouter } from 'react-router-dom';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import createStore from './store';

ReactDOM.render(
    <Provider store ={createStore}>
    <HashRouter>
        <App />
    </HashRouter>
    </Provider>
    , document.getElementById('root'));
unregister();