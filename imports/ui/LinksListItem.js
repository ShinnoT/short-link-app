import React from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

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
  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.copyButtonText}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired
};
