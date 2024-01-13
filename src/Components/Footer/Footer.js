import React from "react";
import TaskFilter from "../TasksFilter";
import "./Footer.css";

const Footer = ({ toDo, onFilterChange, filter, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter onFilterChange={onFilterChange} filter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
