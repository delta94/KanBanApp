import React, { Component } from "react";
import Task from "./Task";

export default class Bucket extends Component {
  state = { newTask: "" };

  handleChange = e => {
    this.setState({ newTask: e.target.value });
  };

  render() {
    const {
      name,
      moveTask,
      addNewTask,
      createNewTask,
      showTaskForm,
      deleteBucket,
      tasks,
      index,
      length,
      onDrag,
      onDrop,
      onDragOver,
      unfocus
    } = this.props;

    let { newTask } = this.state;

    let color;
    switch (index) {
      case 0:
        color = "teal";
        break;
      case 1:
        color = "blue";
        break;
      case 2:
        color = "violet";

        break;

      case 3:
        color = "purple";
        break;
      default:
        color = "pink";
    }

    let style = `ui ${color} fluid card`;

    return (
      <div
        className={style}
        onDrop={event => onDrop(event, index)}
        onDragOver={event => onDragOver(event, index)}
      >
        <div className="ui content">
          <h3 className="left floated">{name}</h3>
          <i
            className="trash icon right floated"
            onClick={() => deleteBucket(index)}
          />
          <br />
          <div className="ui divider" />
          <div className="ui list">
            {tasks.map((task, i) => {
              return (
                <Task
                  task={task}
                  moveTask={moveTask}
                  key={i}
                  index={index}
                  lastIndex={length - 1}
                  onDrag={onDrag}
                />
              );
            })}
          </div>
          {showTaskForm !== name ? (
            <button
              onClick={() => createNewTask(name)}
              className="ui secondary button"
            >
              New Task
            </button>
          ) : null}
          {showTaskForm === name ? (
            <form
              className="ui form"
              onSubmit={e => {
                addNewTask(e, newTask, name);
                this.setState({ newTask: "" });
              }}
            >
              <div className="ui input">
                <input
                  value={newTask}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Add New Task"
                />
              </div>
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}
