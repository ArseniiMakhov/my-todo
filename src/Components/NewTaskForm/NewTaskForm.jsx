import React, { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onChange = (e) => {
    this.setState({ label: e.target.value });
  };

  minChange = (e) => {
    if (e.target.value.match(/^\d*$/) && e.target.value < 60) {
      this.setState({ min: e.target.value });
    }
  };

  secChange = (e) => {
    if (e.target.value.match(/^\d*$/) && e.target.value < 60) {
      this.setState({ sec: e.target.value });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(
      this.state.label,
      this.state.min ? this.state.min : 59,
      this.state.sec ? this.state.sec : 59
    );
    this.setState({ label: '', min: '', sec: '' });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChange}
          value={this.state.label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.minChange}
          value={this.state.min}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.secChange}
          value={this.state.sec}
        />
        <button type="submit" />
      </form>
    );
  }

  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func,
  };
}
