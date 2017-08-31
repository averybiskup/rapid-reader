import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

window.React = React

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
