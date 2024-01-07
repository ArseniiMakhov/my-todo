import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

function TaskList({ todos }) {
  const element = todos.map((el) => {
    const { id, ...props } = el;
    return <Task key={id} {...props} />;
  });

  return <ul className="todo-list">{element}</ul>;
}

export default TaskList;
