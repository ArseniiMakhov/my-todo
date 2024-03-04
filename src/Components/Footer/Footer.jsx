import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter';
import './Footer.css';

const Footer = ({ todos, setFilter, setTodos }) => {
  const doneCount = todos.filter((el) => el.done).length;
  const todoCount = todos.length - doneCount;

  const clearCompleted = () => {
    const completed = todos.filter((el) => el.done);
    completed.map((el) => deleteItem(el.id));
  };

  const deleteItem = (id) => {
    setTodos((todos) => {
      const idx = todos.findIndex((el) => el.id === id);
      const newTodos = [...todos.slice(0, idx), ...todos.slice(idx + 1)];
      return newTodos;
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter setFilter={setFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  toDo: 0,
  onFilterChange: () => {},
  filter: 'all',
  clearCompleted: () => {},
};

Footer.propTypes = {
  toDo: PropTypes.number,
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
  clearCompleted: PropTypes.func,
};

export default Footer;
