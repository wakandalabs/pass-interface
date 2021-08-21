import Providers from "./global/providers.comp";
import TheHeader from "./components/TheHeader";
import InitializeAlert from "./components/InitializeAlert";
import {Route, Switch} from "react-router-dom";
import Explore from "./pages/Explore";
import Following from "./pages/Following";
import Search from "./pages/Search";
import Pass from "./pages/Pass";
import PassItem from "./pages/Pass/Item";
import UserPass from "./pages/User";
import UserPassItem from "./pages/User/Item";
import Wkdt from "./pages/Wkdt";
import Wallet from "./pages/Wallet";
import Initialize from "./pages/Initialize";
import Setting from "./pages/Setting";
import Create from "./pages/Create";
import NotFound from "./pages/not-found";
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
        <Route exact path="/pass/:id" component={PassItem}/>
        <Route exact path="/wkdt" component={Wkdt}/>
        <Route exact path="/wallet" component={Wallet}/>
        <Route exact path="/initialize" component={Initialize}/>
        <Route exact path="/setting" component={Setting}/>
        <Route exact path="/create" component={Create}/>
        <Route exact path="/:account" component={UserPass}/>
        <Route exact path="/:account/:id" component={UserPassItem}/>
        <Route component={NotFound}/>
      </Switch>
    </Providers>
  )
}