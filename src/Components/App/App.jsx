import React, { useState } from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState();

  const timing = (id, min, sec) => {
    let newItem;
    const idx = todos.findIndex((el) => el.id === id);
    const oldItem = todos[idx];

    if (Number(sec) > 0) {
      newItem = { ...oldItem, timerPlay: true, sec: sec - 1 };
    }
    if (Number(sec) === 0 && Number(min) > 0) {
      newItem = { ...oldItem, timerPlay: true, min: min - 1, sec: 59 };
    }
    if (Number(min) === 0 && Number(sec) === 1) {
      clearInterval(oldItem.intervalID);
    }
    setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]);
    console.log(newItem);
  };

  const timerPlay = (id, min, sec) => {
    const idx = todos.findIndex((el) => el.id === id);
    const oldItem = todos[idx];

    if (oldItem.timerPlay) {
      return;
    } else {
      const intervalID = setInterval(() => timing(id, min, sec), 500);
      const newItem = { ...oldItem, intervalID };
      setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]);
    }
  };

  const timerPause = (id, sec) => {
    const idx = todos.findIndex((el) => el.id === id);
    const oldItem = todos[idx];

    if (sec) {
      const newItem = { ...oldItem, timerPlay: false };
      clearInterval(oldItem.intervalID);
      setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]);
    }
  };

  const todoFilter = (items, status) => {
    if (status === 'all') {
      return items;
    }
    if (status === 'active') {
      return items.filter((el) => !el.done);
    }
    if (status === 'done') {
      return items.filter((el) => el.done);
    }
    return items;
  };

  const items = todoFilter(todos, filter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>MyTodo</h1>
        <NewTaskForm setTodos={setTodos} />
      </header>
      <section className="main">
        <TaskList todos={items} setTodos={setTodos} timerPlay={timerPlay} timerPause={timerPause} />
        <Footer todos={todos} setFilter={setFilter} setTodos={setTodos} />
      </section>
    </section>
  );
};

export default App;
