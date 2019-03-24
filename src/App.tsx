import React, { Component } from 'react';
import { Unsubscribe } from 'redux';
import { createStore } from './reducers';
import { addTask, ITask, removeTask } from './reducers/tasks';

const noop = () => undefined;

interface ITaskProps {
  onRemoveClick: () => void;
  task: ITask;
}
function Task (props: ITaskProps) {
  return (
    <div>
      <h2>{props.task.title}</h2>
      <button onClick={props.onRemoveClick}>Remove</button>
    </div>
  );
}

interface IAppState {
  tasks: ITask[];
}

class App extends Component<{}, IAppState> {
  protected store = createStore();
  protected unsubscribe: Unsubscribe = noop;

  constructor (props: any) {
    super(props);
    this.state = {
      tasks: [],
    };
    this.onAddTaskSubmit = this.onAddTaskSubmit.bind(this);
  }

  public render () {
    return (
      <div className="App">
        <form onSubmit={this.onAddTaskSubmit}>
          <button>Add</button>
        </form>
        <div>
          <h1>Tasks</h1>
          {this.state.tasks.map((task) => (
            <Task
              key={task.id}
              onRemoveClick={this.removeTask.bind(this, task)}
              task={task}
            />
          ))}
        </div>
      </div>
    );
  }

  public componentDidMount () {
    this.unsubscribe = this.store.subscribe(() => {
      const state = this.store.getState();
      this.setState({
        tasks: state.tasks.list,
      });
    });
  }

  public componentWillUnmount () {
    this.unsubscribe();
  }

  public onAddTaskSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.store.dispatch(addTask({
      id: String(Date.now()),
      title: `Added ${Date.now()}`,
    }));
  }

  protected removeTask (task: ITask) {
    this.store.dispatch(removeTask(task));
  }
}

export default App;
