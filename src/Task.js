import React, { Component } from "react";

export default class Task extends Component {
  render() {
    const { task, moveTask, index, lastIndex } = this.props;
    return (
      <li>
        {index === 0 ? (
          <i
            onClick={() => moveTask(task, index, "delete")}
            className="delete icon small"
          />
        ) : (
          <i
            onClick={() => moveTask(task, index, "left")}
            className="angle left icon big"
          />
        )}
        {task}
        {index === lastIndex ? (
          <i
            onClick={() => moveTask(task, index, "delete")}
            className="delete icon small"
          />
        ) : (
          <i
            onClick={() => moveTask(task, index, "right")}
            className="angle right icon big"
          />
        )}
      </li>
    );
  }
}
