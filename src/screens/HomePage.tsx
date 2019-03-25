import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, IState } from '../reducers';
import * as tasks from '../reducers/tasks';
import { ITask } from '../reducers/tasks';

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

interface IHomePageStateProps {
  tasks: ITask[];
}
interface IHomePageDispatchProps {
  addTask: (task: ITask) => void;
  removeTask: (task: ITask) => void;
}
type HomePageProps =
  & IHomePageStateProps
  & IHomePageDispatchProps;

function HomePage (props: HomePageProps) {
  const onAddTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    props.addTask({
      id: String(Date.now()),
      title: `Added ${Date.now()}`,
    });
  };

  return (
    <>
      <h1>Home Page</h1>
      <form onSubmit={onAddTaskSubmit}>
        <button>Add</button>
      </form>
      <div>
        <h1>Tasks</h1>
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            onRemoveClick={props.removeTask.bind(null, task)}
            task={task}
          />
        ))}
      </div>
    </>
  );
}

export default connect<
  IHomePageStateProps,
  IHomePageDispatchProps,
  HomePageProps,
  IState
>(
  (state) => ({
    tasks: state.tasks.list,
  }),
  {
    addTask: (task: ITask) => tasks.addAndRemoveTask(task, 1000),
    removeTask: (task: ITask) => tasks.removeTask(task),
  },
)(HomePage);
