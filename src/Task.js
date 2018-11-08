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
        color = "pink";
    }

    let style = `ui ${color} segment`;
    return (
      <div
        className="item"
        draggable
        onDrag={event => onDrag(event, task, index)}
      >
        <div className={style}>
          {task}
          <div className="right floated padding" id="padding">
            {index === 0 ? (
              <i
                onClick={() => moveTask(task, index, "delete")}
                className="delete icon large"
              />
            ) : (
              <i
                onClick={() => moveTask(task, index, "left")}
                className="angle left icon big"
              />
            )}
            {index === lastIndex ? (
              <i
                onClick={() => moveTask(task, index, "delete")}
                className="delete icon large"
              />
            ) : (
              <i
                onClick={() => moveTask(task, index, "right")}
                className="angle right icon big"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
