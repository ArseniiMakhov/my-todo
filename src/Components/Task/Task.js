import React from "react";
import "./Task.css";

function Task({ status, label }) {
  return (
    <li class={status}>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>
          <span class="description">{label}</span>
          <span class="created">created 5 minutes ago</span>
        </label>
        <button class="icon icon-edit"></button>
        <button class="icon icon-destroy"></button>
      </div>

      {status === "editing" && <input type="text" class="edit" value={label} />}
    </li>
  );
}

export default Task;
