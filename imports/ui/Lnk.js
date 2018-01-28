import React from "react";
import { Link } from "react-router-dom";

export class Lnk extends React.Component {
  render() {
    return (
      <div>
        <p>Lnk component</p>
        <Link to="/" className="button">
          Back to Login
        </Link>
      </div>
    );
  }
}
