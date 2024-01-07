import React from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";
import NewTaskForm from "../NewTaskForm";
import "./App.css";

function App() {
  const todos = [
    { label: "Completed task", status: "completed", id: 1 },
    { label: "Editing task", status: "editing", id: 2 },
    { label: "Active task", status: "", id: 3 },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>MyTodo</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todos} />
        <Footer />
      </section>
    </section>
  );
}

export default App;
