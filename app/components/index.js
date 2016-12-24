/* eslint-disable no-unused-vars*/

// React/Redux modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import store from '../redux/store';
import { Provider } from 'react-redux';

// React containers and components
import Home from './Home'
import App from './App';

const appEnter = (nextState) => {
  const enterPath = nextState.location.pathname;
  // Check if user logged in
  // If yes, redirect them to their main page
  // If no, redirect them home
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ Home } onEnter={ appEnter } />
      <Route component={App} onEnter={ appEnter } />
    </Router>
  </Provider>,
  document.getElementById('app')
);
