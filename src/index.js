import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './stylesheets/index.css';
import KeyboardReturn from 'react-icons/lib/md/keyboard-return'

window.React = React

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

ReactDOM.render(
  <div>
    <div>Tilt yo Phone back</div>
    <KeyboardReturn id="icon-render" />
  </div>,
  document.getElementById('icon'));
registerServiceWorker();
