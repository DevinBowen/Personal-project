import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import './css/main.css';
import './css/billingCss.css'
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
<HashRouter>
<App />
</HashRouter>
, document.getElementById('root'));

