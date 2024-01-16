import React from 'react';
import { Component } from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';  

import './App.css';

export default class App extends Component {
  maxId = 1;
  state = {
    todos: [this.createTodoItem('1'), this.createTodoItem('2'), this.createTodoItem('3')],
    filter: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
      created: new Date(),
      status: '',
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todos }) => {
      return {
        todos: [...todos, newItem],
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const newTodos = [...todos.slice(0, idx), ...todos.slice(idx + 1)];
      return { todos: newTodos };
    });
  };

  onToggleDone = (id) => {
    const idx = this.state.todos.findIndex((el) => el.id === id);
    const oldItem = this.state.todos[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    this.setState(({ todos }) => {
      return {
        todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  todoFilter = (items, status) => {
    if(status === 'all') {
      return items;
    }
    if(status === 'active') {
      return items.filter((el) => !el.done);
    }
    if(status === 'done') {
      return items.filter((el) => el.done);
    }
    return items;
  };

  clearCompleted = () => {
    const completed = this.state.todos.filter((el) => el.done);
    completed.map((el) => this.deleteItem(el.id));
  };

  onEditClick = (id) => {
    const idx = this.state.todos.findIndex((el) => el.id === id);
    const item = this.state.todos[idx];
    const editItem = { ...item, status: 'edit' };
    this.setState(({ todos }) => {
      return {
        todos: [...todos.slice(0, idx), editItem, ...todos.slice(idx + 1)],
      };
    });
  };

  onEdit = (e, id, text) => {
    e.preventDefault();
    const idx = this.state.todos.findIndex((el) => el.id === id);
    const item = this.state.todos[idx];
    const editItem = { ...item, label: text, status: '' };
    this.setState(({ todos }) => {
      return {
        todos: [...todos.slice(0, idx), editItem, ...todos.slice(idx + 1)],
      };
    });
  };

  render() {
    const doneCount = this.state.todos.filter((el) => el.done).length;
    const todoCount = this.state.todos.length - doneCount;
    const items = this.todoFilter(this.state.todos, this.state.filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>MyTodo</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={items}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditClick={this.onEditClick}
            onEdit={this.onEdit}
          />
          <Footer
            toDo={todoCount}
            onFilterChange={this.onFilterChange}
            filter={this.state.filter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
