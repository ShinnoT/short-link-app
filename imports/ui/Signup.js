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

    if (password.length < 9) {
      return this.setState({
        error: "Password must be at least 9 characters long"
      });
    }

    Accounts.createUser({ email, password }, error => {
      if (error) {
        this.setState({ error: error.reason });
      } else {
        this.setState({ error: "" });
      }
    });
    // this.setState({
    //   error: "something went wrong..."
    // });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Sign Up</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form
            onSubmit={this.onSubmit.bind(this)}
            noValidate
            className="boxed-view__form"
          >
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
      </div>
    );
  }
}
