import React from 'react';
import {HashRouter, Switch, Route} from "react-router-dom"
import ReactDOM from 'react-dom';
import Explore from './pages/Explore/index';
import Following from "./pages/Following/index";
import Pass from "./pages/Pass/index";
import Wkdt from "./pages/Wkdt/index";
import Search from "./pages/Search/index";
import Wallet from "./pages/Wallet/index";
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Providers from "./global/providers.comp";
import {TheHeader} from "./parts/TheHeader";

ReactDOM.render(
  <Providers>
    <HashRouter>
      <TheHeader/>
      <Switch>
        <Route exact path="/" component={Explore}/>
        <Route exact path="/following" component={Following}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/pass" component={Pass}/>
        <Route exact path="/wkdt" component={Wkdt}/>
        <Route exact path="/wallet" component={Wallet}/>
      </Switch>
    </HashRouter>
  </Providers>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
