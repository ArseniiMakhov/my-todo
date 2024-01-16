import React from 'react';

Footer.propTypes = {
  toDo: PropTypes.number,
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
  clearCompleted: PropTypes.func,
};

import TaskFilter from '../TasksFilter';

import './Footer.css';

import PropTypes from 'prop-types';

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

export default Footer;
