import "./global/config";
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import App from "./App";

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

serviceWorker.unregister();
reportWebVitals();
