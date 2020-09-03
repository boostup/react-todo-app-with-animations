import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

import "./TodosList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: "828bc7bd-27b1-432e-8bdf-99770d072b66",
          task: "walk the fish",
          completed: false,
        },
        {
          id: "829bc7bd-27b1-432e-8bdf-99770d072b66",
          task: "clean the fish tank",
          completed: false,
        },
      ],
    };
  }

  create = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  remove = (id) => {
    this.setState({
      todos: this.state.todos.filter((t) => t.id !== id),
    });
  };

  udpate = (id, updatedTask) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) return { ...todo, task: updatedTask };
        return todo;
      }),
    });
  };

  toggleCompletion = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        return todo;
      }),
    });
  };

  render() {
    const todos = this.state.todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          removeTodo={this.remove}
          updateTodo={this.udpate}
          toggleTodo={this.toggleCompletion}
        />
      );
    });

    return (
      <div className="TodoList">
        <h1>
          Todo List
          <span>A simple React todo list with animations</span>
        </h1>
        <NewTodoForm createTodo={this.create} />
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
