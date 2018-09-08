import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import * as auth from './auth';
import * as firebase from './firebase';

export {
  auth,
  firebase,
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
