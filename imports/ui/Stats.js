import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const Stats = props => {
  let visitMessage = props.visitedCount === 1 ? "visit" : "visits";
  let visitedMessage = null;
  if (typeof props.lastVisitedAt === "number") {
    visitedMessage = `(visited ${moment(props.lastVisitedAt).fromNow()})`;
  }
  return (
    <p>
      {props.visitedCount} {visitMessage} {visitedMessage}
    </p>
  );
};

Stats.propTypes = {
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
