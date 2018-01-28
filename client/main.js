import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";

// local imports
import { Signup } from "../imports/ui/Signup";
import { Lnk } from "../imports/ui/Lnk";
import { NotFound } from "../imports/ui/NotFound";
import { Login } from "../imports/ui/Login";

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/links" component={Lnk} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector("#app"));
});
