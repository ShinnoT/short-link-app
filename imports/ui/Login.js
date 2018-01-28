import React from "react";
import { Link } from "react-router-dom";

export class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page LOGIN</h1>
        <Link to="/signup">Dont have account?</Link>
      </div>
    );
  }
}
