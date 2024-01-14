import React, { Component } from "react";
import "./TaskFilter.css";
import PropTypes from "prop-types";

export default class TaskFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Completed" },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? "selected" : "";
      return (
        <li key={name}>
          <button className={clazz} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }

  static defaultProps = {
    filter: "all",
    onFilterChange: () => {},
  };

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  };
}
