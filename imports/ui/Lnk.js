import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

// local imports
import { Links } from "../api/links";
import { LinksList } from "./LinksList";

export class Lnk extends React.Component {
  onLogout() {
    Accounts.logout();
  }

  onSubmit(event) {
    const url = this.refs.url.value.trim();
    event.preventDefault();
    if (url) {
      Links.insert({ url });
      this.refs.url.value = "";
    }
  }

  render() {
    return (
      <div>
        <p>Your Links</p>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <LinksList />
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </div>
    );
  }
}
