/* eslint-disable no-unused-vars*/

// React/Redux modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import store from '../redux/store';
import { Provider } from 'react-redux';

// Material Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { muiTheme } from './mui-theme';
injectTapEventPlugin();

// React containers and components
import SignIn from './SignIn'
import App from './App';
import Home from './Home'

// Check if user is logged in and redirect them accordingly
const appEnter = (nextState, replace) => {
  const path = nextState.location.pathname;
  const user = store.getState().user;
  // Check if user is logged in
  if (Object.keys(user).length) {
    if (path === '/') replace('/home');
  } else {
    if (path !== '/') replace('/');
  }
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/" component={ SignIn } onEnter={ appEnter } />
        <Route component={App} onEnter={ appEnter }>
          <Route path="/home" component={ Home } />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
