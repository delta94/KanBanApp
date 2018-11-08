import React, { Component } from "react";

export default class Task extends Component {
  render() {
    const { task, moveTask, index, lastIndex, onDrag } = this.props;
    return (
      <div
        className="item"
        draggable
        onDrag={event => onDrag(event, task, index)}
      >
        <div className="ui centered segment">
          {index === 0 ? (
            <i
              onClick={() => moveTask(task, index, "delete")}
              className="delete icon small left-floated"
            />
          ) : (
            <i
              onClick={() => moveTask(task, index, "left")}
              className="angle left icon big left-floated"
            />
          )}
          {task}
          {index === lastIndex ? (
            <i
              onClick={() => moveTask(task, index, "delete")}
              className="delete icon small right-floated"
            />
          ) : (
            <i
              onClick={() => moveTask(task, index, "right")}
              className="angle right icon big right-floated"
            />
          )}
        </div>
      </div>
    );
  }
}
