import "./global/config";
import React from 'react';
import {Switch, Route} from "react-router-dom"
import ReactDOM from 'react-dom';
import Explore from './pages/Explore/index';
import Following from "./pages/Following/index";
import Pass from "./pages/Pass/index";
import Wkdt from "./pages/Wkdt/index";
import Search from "./pages/Search/index";
import Wallet from "./pages/Wallet/index";
import NotFound from "./pages/not-found";
import Initialize from "./pages/Initialize";
import reportWebVitals from './reportWebVitals';
import Setting from './pages/Setting/index';
import * as serviceWorker from './serviceWorker';
import Providers from "./global/providers.comp";
import TheHeader from "./parts/TheHeader";
import InitializeAlert from "./parts/InitializeAlert";
import TheFooter from "./parts/TheFooter";

ReactDOM.render(
  <Providers>
    <TheHeader/>
    <InitializeAlert />
    <Switch>
      <Route exact path="/" component={Explore}/>
      <Route exact path="/following" component={Following}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/pass" component={Pass}/>
      <Route exact path="/wkdt" component={Wkdt}/>
      <Route exact path="/wallet" component={Wallet}/>
      <Route exact path="/initialize" component={Initialize}/>
      <Route exact path="/setting" component={Setting}/>
      <Route component={NotFound}/>
    </Switch>
    <TheFooter/>
  </Providers>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
