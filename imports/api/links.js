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
    const visible = true;
    const visitedCount = 0;
    const lastVisitedAt = null;
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

    Links.insert({
      _id: shortid.generate(),
      url,
      userId,
      visible,
      visitedCount,
      lastVisitedAt
    });
  },
  "links.setVisibility"(linkId, visibility) {
    const userId = this.userId;
    const _id = linkId;
    const visible = visibility;
    if (!userId) {
      throw new Meteor.Error("not authorized");
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    Links.update({ _id, userId }, { $set: { visible } });
  },
  "links.trackVisit"(linkId) {
    const _id = linkId;
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update(
      { _id },
      {
        $set: { lastVisitedAt: new Date().getTime() },
        $inc: { visitedCount: 1 }
      }
    );
  }
});
