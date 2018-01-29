import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Router, Switch, Redirect } from "react-router-dom";
import { Tracker } from "meteor/tracker";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

// local imports
import { Signup } from "../imports/ui/Signup";
import { Lnk } from "../imports/ui/Lnk";
import { NotFound } from "../imports/ui/NotFound";
import { Login } from "../imports/ui/Login";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];
const onEnterPublicPage = () => {
  if (Meteor.userId) {
    history.replace("/links");
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId) {
    history.replace("/");
  }
};

const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Login} onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
      <Route path="/links" component={Lnk} onEnter={onEnterPrivatePage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

Tracker.autorun(() => {
  //double flip with !! changes anything into a boolean
  const isAuthenticated = !!Meteor.userId();
  const pathname = location.pathname;
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnAuthenticatedPage && isAuthenticated) {
    return history.replace("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    return history.replace("/");
  }
  console.log("is authenticated: ", isAuthenticated);
  console.log("pathname: ", pathname);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector("#app"));
});
