import React, { Component } from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";
import NewTaskForm from "../NewTaskForm";
import "./App.css";

export default class App extends Component {
  state = {
    todos: [
      { label: "Completed task", id: 1 },
      { label: "Editing task", id: 2 },
      { label: "Active task", id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const newTodos = [...todos.slice(0, idx), ...todos.slice(idx + 1)];
      return { todos: newTodos };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>MyTodo</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todos={this.state.todos} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </section>
    );
  }
}
