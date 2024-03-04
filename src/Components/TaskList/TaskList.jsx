import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todos, setTodos }) => {
  const element = todos.map((el) => {
    const { id, ...props } = el;
    return <Task key={id} {...props} id={id} todos={todos} setTodos={setTodos} />;
  });

  return <ul className="todo-list">{element}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditClick: () => {},
  onEdit: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditClick: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TaskList;
