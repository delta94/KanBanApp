import React, { Component } from "react";
import "./App.css";
import Bucket from "./Bucket";

class App extends Component {
  state = {
    bucketNames: ["Planning", "Design", "Development", "Deployment"],
    buckets: {
      Planning: ["Undo"],
      Design: [],
      Development: [],
      Deployment: [
        "Delete Task (Undo)",
        "Create Task",
        "Move Task",
        "Create Bucket",
        "Persist Data",
        "Make Responsive",
        "Tasks",
        "Buckets",
        "App"
      ]
    },
    showBucketForm: false,
    showTaskForm: false,
    newBucket: "",
    draggedTask: "",
    draggedFromIndex: null,
    unfocusCounter: 0
  };

  componentDidMount() {
    if (!localStorage.getItem("reset")) {
      this.hydrateStateWithLocalStorage();
    }
    window.addEventListener("beforeunload", this.saveStateToLocalStorage);
  }

  hydrateStateWithLocalStorage = () => {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  };

  saveStateToLocalStorage = () => {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem([key], JSON.stringify(this.state[key]));
    }
  };

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage);

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  handleChange = e => {
    this.setState({ newBucket: e.target.value });
  };

  createNewBucket = () => {
    console.log("clicked button");
    this.setState({ showBucketForm: true });
  };

  addNewBucket = e => {
    e.preventDefault();
    e.target.value = "";
    let bucketNames = [...this.state.bucketNames];
    bucketNames.push(this.state.newBucket);
    let buckets = this.state.buckets;
    buckets[this.state.newBucket] = [];
    this.setState({
      buckets: buckets,
      bucketNames,
      newBucket: "",
      showBucketForm: false
    });
  };

  createNewTask = name => {
    console.log("clicked button");
    this.setState({ showTaskForm: name });
  };

  addNewTask = (e, newTask, bucket) => {
    e.preventDefault();
    e.target.value = "";
    let buckets = { ...this.state.buckets };
    buckets[bucket].push(newTask);
    this.setState({ buckets: buckets, newTask: "", showTaskForm: false });
  };

  moveTask = (task, index, direction) => {
    let offset;
    switch (direction) {
      case "right":
        offset = 1;
        break;
      case "left":
        offset = -1;
        break;
      default:
        offset = 0;
    }

    const { buckets, bucketNames } = this.state;

    let removalBucket = buckets[bucketNames[index]];

    let newBuckets;

    removalBucket = removalBucket.filter(t => {
      return t !== task;
    });
    let addBucket = [...buckets[bucketNames[index + offset]], task];

    if (offset === 0) {
      newBuckets = {
        ...buckets,
        [bucketNames[index]]: removalBucket
      };
    } else {
      newBuckets = {
        ...buckets,
        [bucketNames[index]]: removalBucket,
        [bucketNames[index + offset]]: addBucket
      };
    }

    this.setState({
      buckets: newBuckets
    });
  };

  onDrag = (event, task, draggedFromIndex) => {
    event.preventDefault();
    this.setState({
      draggedTask: task,
      draggedFromIndex
    });
  };

  onDragOver = (event, index) => {
    event.preventDefault();
  };

  onDrop = (event, index) => {
    const { draggedTask, buckets, draggedFromIndex, bucketNames } = this.state;
    let removalBucket = buckets[bucketNames[draggedFromIndex]];

    removalBucket = removalBucket.filter(t => {
      return t !== draggedTask;
    });

    let addBucket = [...buckets[bucketNames[index]], draggedTask];

    let newBuckets = {
      ...buckets,
      [bucketNames[draggedFromIndex]]: removalBucket,
      [bucketNames[index]]: addBucket
    };

    this.setState({
      buckets: newBuckets,
      draggedTask: {}
    });
  };

  deleteBucket = index => {
    const buckets = { ...this.state.buckets };
    const bucketNames = [...this.state.bucketNames];
    let removalBucket = buckets[bucketNames[index]];
    let newBucketNames = bucketNames.filter((name, i) => {
      return i !== index;
    });
    let newBuckets = {
      ...buckets
    };
    delete newBuckets[bucketNames[index]];
    this.setState({
      buckets: newBuckets,
      bucketNames: newBucketNames
    });
  };

  unfocus = e => {
    this.setState({
      showBucketForm: false,
      showTaskForm: false,
      unfocusCounter: 0
    });
  };

  render() {
    const {
      bucketNames,
      showTaskForm,
      showBucketForm,
      newBucket,
      newTask
    } = this.state;

    return (
      <div onDoubleClick={this.unfocus}>
        <h1 className="ui center aligned icon header">
          <i className="sticky note outline icon" />
          Oren's Kanban App
        </h1>
        <div className="ui container">
          <div className="ui doubling stackable three column grid">
            {bucketNames.map((bucket, i) => {
              return (
                <div className="column" key={bucket}>
                  <Bucket
                    key={i}
                    index={i}
                    length={bucketNames.length}
                    name={bucket}
                    newTask={newTask}
                    tasks={this.state.buckets[bucket]}
                    moveTask={this.moveTask}
                    createNewTask={this.createNewTask}
                    addNewTask={this.addNewTask}
                    showTaskForm={showTaskForm}
                    onDrag={this.onDrag}
                    onDrop={this.onDrop}
                    onDragOver={this.onDragOver}
                    deleteBucket={this.deleteBucket}
                    unfocus={this.unfocus}
                  />
                </div>
              );
            })}

            <div className="ui column">
              {!showBucketForm ? (
                <div className="ui card">
                  <button
                    className="ui secondary button"
                    onClick={this.createNewBucket}
                  >
                    New Bucket
                  </button>
                </div>
              ) : null}

              {showBucketForm ? (
                <form className="ui  card" onSubmit={this.addNewBucket}>
                  <div className="ui input">
                    <input
                      value={newBucket}
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Add New Bucket"
                    />
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
