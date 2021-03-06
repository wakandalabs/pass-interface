import Providers from "./global/providers.comp";
import TheHeader from "./components/TheHeader";
import InitializeAlert from "./components/InitializeAlert";
import {Route, Switch} from "react-router-dom";
import Explore from "./pages/Explore";
import Following from "./pages/Following";
import Search from "./pages/Search";
import Pass from "./pages/Pass";
import PassItem from "./pages/Pass/Item";
import Wkdt from "./pages/Wkdt";
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
        <Route exact path="/wkdt" component={Wkdt}/>
        <Route exact path="/initialize" component={Initialize}/>
        <Route exact path="/setting" component={Setting}/>
        <Route exact path="/create" component={Create}/>
        <Route exact path="/:account" component={Pass}/>
        <Route exact path="/:account/:id" component={PassItem}/>
        <Route component={NotFound}/>
      </Switch>
    </Providers>
  )
}