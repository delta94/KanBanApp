import React, { Component } from "react";

export default class Task extends Component {
  render() {
    const { task, moveTask, index, lastIndex, onDrag } = this.props;

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
        color = "orange";
    }

    let style = `ui centered ${color} segment`;
    return (
      <div
        className="item"
        draggable
        onDrag={event => onDrag(event, task, index)}
      >
        <div className={style}>
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
