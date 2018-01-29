import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

export class Lnk extends React.Component {
  onLogout() {
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <p>Your Links</p>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}
