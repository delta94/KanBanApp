import React, { Component } from "react";

export default class Task extends Component {
  render() {
    const { task, moveTask, index, lastIndex } = this.props;
    return (
      <li>
        {index === 0 ? null : (
          <i
            onClick={() => moveTask(task, index, "left")}
            className="angle left icon big"
          />
        )}
        {task}
        {index === lastIndex ? null : (
          <i
            onClick={() => moveTask(task, index, "right")}
            className="angle right icon big"
          />
        )}
      </li>
    );
  }
}
