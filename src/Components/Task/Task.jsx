import React, { useState } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import { Timer } from '../Timer/Timer';

const Task = ({ todos, setTodos, label, done, created, status, id, min, sec, timerPoint, out }) => {
  const [value, setValue] = useState(label);

  const onEdit = (e, id, text) => {
    e.preventDefault();
    const idx = todos.findIndex((el) => el.id === id);
    const item = todos[idx];
    const editItem = { ...item, label: text, status: '' };
    setTodos((todos) => [...todos.slice(0, idx), editItem, ...todos.slice(idx + 1)]);
  };

  const onEditClick = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    const item = todos[idx];
    const editItem = { ...item, status: 'edit' };
    setTodos((todos) => [...todos.slice(0, idx), editItem, ...todos.slice(idx + 1)]);
  };

  const deleteItem = (id) => {
    setTodos((todos) => {
      const idx = todos.findIndex((el) => el.id === id);
      const newTodos = [...todos.slice(0, idx), ...todos.slice(idx + 1)];
      return newTodos;
    });
  };

  const onToggleDone = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    const oldItem = todos[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    setTodos((todos) => [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]);
  };

  function renderTimer() {
    if (out) {
      return <span className="description">Out of time</span>;
    }

    if (done) {
      return <span className="description">Complited</span>;
    }

    return <Timer min={min} sec={sec} done={done} id={id} todos={todos} setTodos={setTodos} timerPoint={timerPoint} />;
  }

  const createTime = formatDistanceToNow(created, {
    addSuffix: true,
    includeSeconds: true,
  });

  let classNames = '';
  let isChecked = '';

  if (done) {
    classNames += ' completed';
    isChecked += 'checked';
  }

  if (status) {
    classNames += ' editing';
  }

  return (
    <li className={classNames}>
      {status === '' && (
        <div className="view">
          <input className="toggle" type="checkbox" onChange={() => onToggleDone(id)} checked={isChecked} />
          <label>
            <span className="title">{label}</span>
            {renderTimer()}
            <span className="description">{`created ${createTime}`}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={() => onEditClick(id)}></button>
          <button type="button" className="icon icon-destroy" onClick={() => deleteItem(id)}></button>
        </div>
      )}

      {status === 'edit' && (
        <form onSubmit={(e) => onEdit(e, id, value)}>
          <input type="text" className="edit" value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
      )}
    </li>
  );
};

Task.defaultProps = {
  todos: [],
  setTodos: () => {},
  label: '',
  done: false,
  created: new Date(),
  status: '',
  id: 0,
  min: 59,
  sec: 59,
  timerPoint: null,
  out: false,
};

Task.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  setTodos: PropTypes.func,
  label: PropTypes.string,
  done: PropTypes.bool,
  created: PropTypes.object,
  status: PropTypes.string,
  id: PropTypes.number,
  min: PropTypes.number,
  sec: PropTypes.number,
  timerPoint: PropTypes.number,
  out: PropTypes.bool,
};

export default Task;
