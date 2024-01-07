import React from "react";
import "./NewTaskForm.css";

function NewTaskForm() {
  return (
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
    />
  );
}

export default NewTaskForm;
