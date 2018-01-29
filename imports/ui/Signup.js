import React from "react";
import { Link } from "react-router-dom";

import { Accounts } from "meteor/accounts-base";

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  onSubmit(event) {
    event.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Accounts.createUser({ email, password }, error => {
      console.log("signup callback", error);
    });
    // this.setState({
    //   error: "something went wrong..."
    // });
  }

  render() {
    return (
      <div>
        <p>Signup component here</p>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input
            type="password"
            ref="password"
            name="password"
            placeholder="Password"
          />
          <button>Sign Up</button>
        </form>
        <Link to="/">Login</Link>
      </div>
    );
  }
}
