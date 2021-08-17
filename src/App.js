import Providers from "./global/providers.comp";
import TheHeader from "./parts/TheHeader";
import InitializeAlert from "./parts/InitializeAlert";
import {Route, Switch} from "react-router-dom";
import Explore from "./pages/Explore";
import Following from "./pages/Following";
import Search from "./pages/Search";
import Pass from "./pages/Pass";
import Wkdt from "./pages/Wkdt";
import Wallet from "./pages/Wallet";
import Initialize from "./pages/Initialize";
import Setting from "./pages/Setting";
import Create from "./pages/create";
import NotFound from "./pages/not-found";
import TheFooter from "./parts/TheFooter";
import React from "react";

export default function App(){
  return(
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
        <Route exact path="/create" component={Create}/>
        <Route component={NotFound}/>
      </Switch>
      <TheFooter/>
    </Providers>
  )
}