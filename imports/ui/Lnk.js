import React from "react";
// import { Meteor } from "meteor/meteor";
// import { Accounts } from "meteor/accounts-base";
// import { Link } from "react-router-dom";

// local imports
// import { Links } from "../api/links";
import { LinksList } from "./LinksList";
import { Header } from "./Header";
import { AddLink } from "./AddLink";
import { LinksListFilters } from "./LinksListFilters";

// export class Lnk extends React.Component {
//   render() {
//     return (
//       <div>
//         <Header title="Your Links" />
//         <LinksList />
//         <AddLink />
//       </div>
//     );
//   }
// }

// stateless functional component instead of class component
// for dumb and easy components
// cuz faster

export const Lnk = () => {
  return (
    <div>
      <Header title="Your Links" />
      <div className="page-content">
        <LinksListFilters />
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
};
