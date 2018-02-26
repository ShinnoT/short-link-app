import React from "react";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";

export class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    };
  }
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      const showVisible = Session.get("showVisible");
      this.setState({ showVisible });
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  onChange(event) {
    Session.set("showVisible", !event.target.checked);
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input
            className="checkbox__box"
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={this.onChange.bind(this)}
          />
          show hidden links
        </label>
      </div>
    );
  }
}
