import React from 'react';
import {Switch, Route} from "react-router-dom"
import ReactDOM from 'react-dom';
import Explore from './pages/Explore';
import Following from "./pages/Following";
import Pass from "./pages/Pass";
import Wkdt from "./pages/Wkdt";
import Search from "./pages/Search";
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Providers from "./global/providers.comp";
import {TheHeader} from "./parts/TheHeader";

ReactDOM.render(
  <Providers>
    <TheHeader/>
    <Switch>
      <Route exact path="/" component={Explore}/>
      <Route exact path="/following" component={Following}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/pass" component={Pass}/>
      <Route exact path="/wkdt" component={Wkdt}/>
    </Switch>
  </Providers>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
