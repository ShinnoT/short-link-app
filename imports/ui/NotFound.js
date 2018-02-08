import React from "react";
import { Link } from "react-router-dom";

// export class NotFound extends React.Component {
//   render() {
//     return <p>404: Page Not Found</p>;
//   }
// }

export const NotFound = () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>404: Page Not Found</h1>
        <p>unable to find your page...</p>
        <Link to="/">Home Page</Link>
      </div>
    </div>
  );
};
