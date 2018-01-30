import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import ReactDOM from "react-dom";

//local imports
// import { Links } from "../imports/api/links";
// import { Link } from "react-router-dom";
import { onAuthChange, routes } from "../imports/routes/routes";
import "../imports/startup/simple-schema-configuration.js";

Tracker.autorun(() => {
  //double flip with !! changes anything into a boolean
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector("#app"));
});
