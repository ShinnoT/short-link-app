import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import shortid from "shortid";

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

    //label property set equal to 'Your link' is so that
    //error message comes out prettier
    // try {
    new SimpleSchema({
      url: {
        type: String,
        label: "Your link",
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });
    // } catch (error) {
    //   throw new Meteor.Error(400, error.message);
    // }

    Links.insert({ _id: shortid.generate(), url, userId });
  }
});
