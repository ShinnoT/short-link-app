import React from "react";
import { Tracker } from "meteor/tracker";

import { Links } from "../api/links";

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
      const links = Links.find().fetch();
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
      return (
        <div key={link._id}>
          <a href={link.url} target="_blank">
            {link.url}
          </a>
        </div>
      );
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
