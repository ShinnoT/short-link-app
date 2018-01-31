import React from "react";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";

Modal.setAppElement(document.body);

export class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      isOpen: false
    };
  }

  onSubmit(event) {
    const { url } = this.state;
    // const url = this.refs.url.value.trim();
    // const userId = Meteor.userId();
    event.preventDefault();
    if (url) {
      // Links.insert({ url, userId });
      Meteor.call("links.insert", url, (error, response) => {
        if (!error) {
          this.setState({ isOpen: false, url: "" });
        }
      });
    }
  }

  onChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: true })}>
          Add Link
        </button>
        <Modal isOpen={this.state.isOpen} contentLabel="Add link">
          <p>Add Link</p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button>Add Link</button>
          </form>
          <button onClick={() => this.setState({ isOpen: false, url: "" })}>
            Cancel
          </button>
        </Modal>
      </div>
    );
  }
}
