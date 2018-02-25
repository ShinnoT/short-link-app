import React from "react";
import { Accounts } from "meteor/accounts-base";
import PropTypes from "prop-types";

// export class Header extends React.Component {
//   onLogout() {
//     Accounts.logout();
//   }

//   render() {
//     return (
//       <div>
//         <p>{this.props.title}</p>
//         <button onClick={this.onLogout.bind(this)}>Logout</button>
//       </div>
//     );
//   }
// }

export const Header = props => {
  const logout = () => {
    Accounts.logout();
  };
  return (
    <div className="nav-bar">
      <h1>{props.title}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};
