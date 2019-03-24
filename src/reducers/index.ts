import { Store as ReduxStore } from 'redux';
import { combineReducers, createStore as createReduxStore } from 'redux';
import { ITaskState, reduceTask, TaskAction } from './tasks';

export interface IState {
  tasks: ITaskState;
}

export type Action = TaskAction;
export type Dispatch = (action: Action) => void;
export type Store = ReduxStore<IState, Action>;

const rootReducer = combineReducers<IState>({
  tasks: reduceTask,
});
export default rootReducer;

export function createStore () {
  const store = createReduxStore<IState, Action, {}, {}>(
    rootReducer,
  );
  return store;
}
