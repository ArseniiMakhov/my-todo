import React, { Component } from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({ label: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChange}
          value={this.state.label}
        />
      </form>
    );
  }
}
