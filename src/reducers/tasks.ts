import { Dispatch } from '.';

export interface ITask {
  id: string;
  title: string;
}

export interface ITaskState {
  list: ITask[];
}
const initialTasks: ITaskState = {
  list: [],
};

export enum Type {
  add = 'tasks/add',
  remove = 'tasks/remove',
}

interface ITaskActionAdd {
  task: ITask;
  type: Type.add;
}

interface ITaskActionRemove {
  task: ITask;
  type: Type.remove;
}

export type TaskAction =
  | ITaskActionAdd
  | ITaskActionRemove;

export function addTask (task: ITask): ITaskActionAdd {
  return {
    task,
    type: Type.add,
  };
}

export function removeTask (task: ITask): ITaskActionRemove {
  return {
    task,
    type: Type.remove,
  };
}

export function addAndRemoveTask (task: ITask, delay: number) {
  return (dispatch: Dispatch) => {
    console.log(`# add`);
    dispatch(addTask(task));
    setTimeout(() => {
      console.log(`# remove`);
      dispatch(removeTask(task));
    }, 1000);
  };
}

export function reduceTasks (
  state: ITask[],
  action: TaskAction,
): ITask[] {
  switch (action.type) {
    case Type.add:
      return [...state, action.task];
    case Type.remove: {
      const list = [...state];
      list.splice(state.indexOf(action.task), 1);
      return list;
    }
    default:
      return state;
  }
}

export function reduceTask (
  state = initialTasks,
  action: TaskAction,
): ITaskState {
  switch (action.type) {
    case Type.add:
    case Type.remove:
      return {
        ...state,
        list: reduceTasks(state.list, action),
      };
    default:
      return state;
  }
}
