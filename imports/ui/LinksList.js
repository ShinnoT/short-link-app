import React from "react";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

import { Links } from "../api/links";
import { LinksListItem } from "./LinksListItem";

export class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.LinksTracker = Tracker.autorun(() => {
      Meteor.subscribe("links");
      const links = Links.find({
        visible: Session.get("showVisible")
      }).fetch();
      this.setState({ links });
      console.log(links);
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.LinksTracker.stop();
  }

  renderLinksListItems() {
    const links = this.state.links;
    return links.map(link => {
      // absoluteUrl generates urls for your app
      const shortUrl = Meteor.absoluteUrl(link._id, {
        rootUrl: "localhost:3000/links",
        secure: true
      });
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
      // return (
      //   <div key={link._id}>
      //     <a href={link.url} target="_blank">
      //       {link.url}
      //     </a>
      //   </div>
      // );
    });
  }

  render() {
    return (
      <div>
        <p>Links List</p>
        <div>{this.renderLinksListItems()}</div>
      </div>
    );
  }
}
