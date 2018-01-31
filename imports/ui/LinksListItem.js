import React from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import moment from "moment";

// import { Tracker } from "meteor/tracker";

import { Stats } from "./Stats";

export class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyButtonText: "Copy"
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard
      .on("success", () => {
        // alert("it worked!");
        this.setState({
          copyButtonText: "Copied"
        });
        setTimeout(() => {
          this.setState({
            copyButtonText: "Copy"
          });
        }, 600);
      })
      .on("error", () => {
        alert("sorry your browser is too old, please manually copy");
      });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  onClick() {
    Meteor.call("links.setVisibility", this.props._id, !this.props.visible);
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>visible: {this.props.visible.toString()}</p>
        {/* {element.toString()} */}
        <Stats
          visitedCount={this.props.visitedCount}
          lastVisitedAt={this.props.lastVisitedAt}
        />
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.copyButtonText}
        </button>
        <button onClick={this.onClick.bind(this)}>
          {this.props.visible ? "Hide" : "Unhide"}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
