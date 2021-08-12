import React from 'react';
import {Switch, Route} from "react-router-dom"
import ReactDOM from 'react-dom';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Providers from "./global/providers.comp";

ReactDOM.render(
  <Providers>
    <Switch>
      <Route exact path="/" component={App}/>
    </Switch>
  </Providers>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
