import React, { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  state = {
    done: false,
  };

  toggleClick = () => {
    this.setState(({ done }) => {
      return { done: !done };
    });
  };

  render() {
    const { label, onDeleted } = this.props;
    const { done } = this.state;

    let classNames = "";
    let isChecked = "";
    if (done) {
      classNames += " completed";
      isChecked += " checked";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={this.toggleClick}
            checked={isChecked}
          />
          <label>
            <span className="description" onClick={this.toggleClick}>
              {label}
            </span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        {/* {status === "editing" && (
          <input type="text" className="edit" value={label} />
        )} */}
      </li>
    );
  }
}
