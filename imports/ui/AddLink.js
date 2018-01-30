import React from "react";
import { Meteor } from "meteor/meteor";

export class AddLink extends React.Component {
  onSubmit(event) {
    const url = this.refs.url.value.trim();
    // const userId = Meteor.userId();
    event.preventDefault();
    if (url) {
      // Links.insert({ url, userId });
      Meteor.call("links.insert", url);
      this.refs.url.value = "";
    }
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
