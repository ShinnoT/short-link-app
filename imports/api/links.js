import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Links = new Mongo.Collection("links");

// instead of the autopublish meteor package
if (Meteor.isServer) {
  Meteor.publish("links", function() {
    //logical to use Meteor.userId() here
    // but accorfing to docs, we can use it anywhere BUT here inside publish :(
    const userId = this.userId;
    return Links.find({ userId });
  });
}

// meteor methods
Meteor.methods({
  "links.insert"(url) {
    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error("not authorized");
    }

    Links.insert({ url, userId });
  }
});
