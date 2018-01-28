import React from "react";
import { Link } from "react-router-dom";

export class Signup extends React.Component {
  render() {
    return (
      <div>
        <p>Signup component here</p>
        <Link to="/">Login</Link>
      </div>
    );
  }
}
