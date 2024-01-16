import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter';
import './Footer.css';

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
