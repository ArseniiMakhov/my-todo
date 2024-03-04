import React, { useState } from 'react';
import './TaskFilter.css';
import PropTypes from 'prop-types';

const TaskFilter = ({ setFilter }) => {
  const [buttons, setButtons] = useState([
    { name: 'all', label: 'All', isActive: true },
    { name: 'active', label: 'Active', isActive: false },
    { name: 'done', label: 'Completed', isActive: false },
  ]);

  const onFilterChange = (filter) => {
    setButtons((buttons) => {
      return buttons.map((el) => {
        if (el.name === filter) {
          return { ...el, isActive: true };
        } else {
          return { ...el, isActive: false };
        }
      });
    });
    setFilter(filter);
  };

  const btns = buttons.map(({ name, label, isActive }) => {
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{btns}</ul>;
};

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
