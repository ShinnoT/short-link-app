import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

// local imports
import "../imports/api/users";
import { Links } from "../imports/api/links";
import "../imports/startup/simple-schema-configuration.js";

Meteor.startup(() => {
  // code to run on server at startup

  // // example where once they visit our site, it will automatically be
  // // redirected to google.com
  // WebApp.connectHandlers.use((request, response, next) => {
  //   response.statusCode = 302;
  //   response.setHeader("Location", "https://www.google.com");
  //   response.end();
  //   // next();
  // });

  WebApp.connectHandlers.use((request, response, next) => {
    const _id = request.url.slice(7);
    const link = Links.findOne({ _id });

    if (link) {
      response.statusCode = 302;
      response.setHeader("Location", `${link.url}`);
      response.end();
    } else {
      next();
    }
  });
});
