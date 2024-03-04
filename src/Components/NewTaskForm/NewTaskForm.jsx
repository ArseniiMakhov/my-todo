import React, { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ setTodos }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const createTodoItem = (label, min, sec) => {
    return {
      label,
      done: false,
      id: Date.now(),
      created: new Date(),
      status: '',
      min,
      sec,
      timerPoint: null,
      isCounting: false,
    };
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodos((todos) => [...todos, newItem]);
  };

  const onChange = (e) => {
    setLabel(e.target.value);
  };

  const minChange = (e) => {
    if (e.target.value.match(/^\d*$/) && e.target.value < 60) {
      setMin(e.target.value);
    }
  };

  const secChange = (e) => {
    if (e.target.value.match(/^\d*$/) && e.target.value < 60) {
      setSec(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(label, min || 59, sec || 59);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onChange}
        value={label}
      />
      <input type="text" className="new-todo-form__timer" placeholder="Min" onChange={minChange} value={min} />
      <input type="text" className="new-todo-form__timer" placeholder="Sec" onChange={secChange} value={sec} />
      <button type="submit" />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};

export default NewTaskForm;
