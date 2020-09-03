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
    evt.stopPropagation();
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

  renderClassName = () => {
    let className = "Todo-task";
    return this.props.completed ? `${className} completed` : `${className}`;
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
        <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
          <input
            name="task"
            type="text"
            value={this.state.task}
            onChange={this.handleChange}
            autoFocus
          />
          <button>Save</button>
        </form>
      );

    return (
      // TODO: onClick={this.handleToggleCompletion}
      <li className={this.renderClassName()}>{this.props.task}</li>
    );
  };

  render() {
    return (
      <div className="Todo">
        {this.renderFormOrTask()}
        {this.renderTaskButtons()}
      </div>
    );
  }
}

export default Todo;
