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

  renderTaskText = () => {
    return (
      <div onClick={this.handleToggleCompletion} className="Todo-task-text">
        {this.props.task}
      </div>
    );
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
        <CSSTransition key="editing" timeout={500} classNames="form">
          <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
            <input
              type="text"
              value={this.state.task}
              name="task"
              onChange={this.handleChange}
            />
            <button>Save</button>
          </form>
        </CSSTransition>
      );

    return (
      <CSSTransition key="normal" timeout={500} classNames="task">
        <li className="Todo-task">
          {this.renderTaskText()}
          {this.renderTaskButtons()}
        </li>
      </CSSTransition>
    );
  };

  renderClassName = () => {
    let className = "Todo";
    return this.props.completed ? `${className} completed` : `${className}`;
  };

  render() {
    return (
      <TransitionGroup className={this.renderClassName()}>
        {this.renderFormOrTask()}
      </TransitionGroup>
    );
  }
}

export default Todo;
