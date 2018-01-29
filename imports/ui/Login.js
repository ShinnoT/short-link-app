import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export class Login extends React.Component {
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
    Meteor.loginWithPassword({ email }, password, error => {
      if (error) {
        this.setState({ error: "Unable to login. check email and password." });
      } else {
        this.setState({ error: "" });
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Home Page LOGIN</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input
            type="password"
            ref="password"
            name="password"
            placeholder="Password"
          />
          <button>Log in</button>
        </form>
        <Link to="/signup">Dont have account?</Link>
      </div>
    );
  }
}
