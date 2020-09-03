import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = { isEditing: false, task: this.props.task };
  }

  handleRemove = () => {
    const { id, removeTodo } = this.props;
    removeTodo(id);
  };

  toggleForm = (evt) => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleUpdate = (evt) => {
    evt.preventDefault();
    const { id, updateTodo } = this.props;
    updateTodo(id, this.state.task);
    this.toggleForm(evt);
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleToggleCompletion = (evt) => {
    this.props.toggleTodo(this.props.id);
  };

  renderTaskButtons = () => {
    return (
      <div className="Todo-buttons">
        <button onClick={this.toggleForm}>
          <i className="fas fa-pen" />
        </button>
        <button onClick={this.handleRemove}>
          <i className="fas fa-trash" />
        </button>
      </div>
    );
  };

  renderFormOrTask = () => {
    if (this.state.isEditing)
      return (
        // <CSSTransition key="editing" timeout={500} classNames="form">
        <form onSubmit={this.handleUpdate}>
          <input
            name="task"
            type="text"
            value={this.state.task}
            onChange={this.handleChange}
            autoFocus
          />
          <button>Save</button>
        </form>
        // </CSSTransition>
      );

    return (
      // <CSSTransition key="normal" timeout={500} classNames="task-text">
      <li className="Todo-task" onClick={this.handleToggleCompletion}>
        {this.props.task}
      </li>
      // </CSSTransition>
    );
  };

  renderClassName = () => {
    let className = "Todo";
    return this.props.completed ? `${className} completed` : `${className}`;
  };

  render() {
    return (
      <div className={this.renderClassName()}>
        {this.renderFormOrTask()}
        {this.renderTaskButtons()}
      </div>
    );
  }
}

export default Todo;
