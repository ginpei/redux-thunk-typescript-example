import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Unsubscribe } from 'redux';
import { createStore } from './reducers';
import HomePage from './screens/HomePage';

const noop = () => undefined;

class App extends Component {
  protected appHistory = createBrowserHistory();
  protected store = createStore();
  protected unsubscribe: Unsubscribe = noop;

  public render () {
    return (
      <Provider store={this.store}>
        <Router history={this.appHistory}>
          <div className="App">
            <Switch>
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }

}

export default App;
