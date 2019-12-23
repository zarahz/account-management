import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import AppProvider from './Provider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to registration() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
