import React from "react";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";

Modal.setAppElement(document.body);

export class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      isOpen: false,
      error: ""
    };
  }

  onSubmit(event) {
    const { url } = this.state;
    // const url = this.refs.url.value.trim();
    // const userId = Meteor.userId();
    event.preventDefault();

    // Links.insert({ url, userId });
    Meteor.call("links.insert", url, (error, response) => {
      if (!error) {
        this.handleModalClose();
      } else {
        this.setState({ error: error.reason });
      }
    });
  }

  onChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleModalClose() {
    this.setState({ isOpen: false, url: "", error: "" });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: true })}>
          Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button>Add Link</button>
          </form>
          <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
        </Modal>
      </div>
    );
  }
}
