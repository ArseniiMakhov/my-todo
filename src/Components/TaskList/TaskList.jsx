import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ todos, onDeleted, onToggleDone, onEditClick, onEdit, timerPlay, timerPause }) {
  const element = todos.map((el) => {
    const { id, ...props } = el;
    return (
      <Task
        key={id}
        {...props}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEditClick={() => onEditClick(id)}
        onEdit={onEdit}
        timerPlay={timerPlay}
        timerPause={timerPause}
        id={id}
      />
    );
  });

  return <ul className="todo-list">{element}</ul>;
}

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
