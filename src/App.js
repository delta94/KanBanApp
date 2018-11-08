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
    newBucket: ""
  };

  componentDidMount() {
    if (!localStorage.getItem("reset")) {
      this.hydrateStateWithLocalStorage();
    }
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  hydrateStateWithLocalStorage() {
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
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem([key], JSON.stringify(this.state[key]));
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

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

    let buckets = this.state.buckets;
    let bucketNames = this.state.bucketNames;

    let removalBucket = buckets[this.state.bucketNames[index]];

    removalBucket = removalBucket.filter(t => {
      return t !== task;
    });
    let addBucket = [...buckets[this.state.bucketNames[index + offset]], task];

    if (offset === 0) {
      buckets = {
        ...this.state.buckets,
        [this.state.bucketNames[index]]: removalBucket
      };
    } else {
      buckets = {
        ...this.state.buckets,
        [this.state.bucketNames[index]]: removalBucket,
        [this.state.bucketNames[index + offset]]: addBucket
      };
    }

    this.setState({
      buckets: buckets
    });
  };

  render() {
    const {
      buckets,
      bucketNames,
      showTaskForm,
      showBucketForm,
      newBucket,
      newTask
    } = this.state;

    return (
      <React.Fragment>
        <h1 class="ui center aligned icon header">
          <i class="sticky note outline icon" />
          Oren's Kanban App
        </h1>
        <div className="ui container">
          <div className="ui doubling three column grid">
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
                  />
                </div>
              );
            })}

            <div className="column">
              {!showBucketForm ? (
                <div className="ui card">
                  <button
                    className="ui secondary button"
                    onClick={this.createNewBucket}
                    className="ui secondary button"
                  >
                    New Bucket
                  </button>
                </div>
              ) : null}
              {showBucketForm ? (
                <form className="ui form" onSubmit={this.addNewBucket}>
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
      </React.Fragment>
    );
  }
}

export default App;
