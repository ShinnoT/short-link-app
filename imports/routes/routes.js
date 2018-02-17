import { Meteor } from "meteor/meteor";
import React from "react";
import { Link, Route, Router, Switch, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

//routes defined by react router for the entire app

// local imports
import { Signup } from "../ui/Signup";
import { Lnk } from "../ui/Lnk";
import { NotFound } from "../ui/NotFound";
import { Login } from "../ui/Login";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];
const onEnterPublicPage = () => {
  if (Meteor.userId) {
    return history.replace("/links");
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId) {
    return history.replace("/");
  }
};

export const onAuthChange = isAuthenticated => {
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
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Login} onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
      <Route path="/links" component={Lnk} onEnter={onEnterPrivatePage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
