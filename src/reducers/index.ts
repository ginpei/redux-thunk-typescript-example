import { Store as ReduxStore } from 'redux';
import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { ITaskState, reduceTask, TaskAction } from './tasks';

export interface IState {
  tasks: ITaskState;
}

export type Action = TaskAction;
export type Dispatch = ThunkDispatch<IState, void, Action>;
export type Store = ReduxStore<IState, Action>;

const rootReducer = combineReducers<IState>({
  tasks: reduceTask,
});
export default rootReducer;

export function createStore () {
  const store = createReduxStore<IState, Action, {}, {}>(
    rootReducer,
    applyMiddleware(thunkMiddleware),
  );
  return store;
}
