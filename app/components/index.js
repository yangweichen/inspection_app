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

const appEnter = (nextState) => {
  const enterPath = nextState.location.pathname;
  // Check if user logged in
  // If yes, redirect them to their main page
  // If no, redirect them SignIn
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/" component={ SignIn } onEnter={ appEnter } />
        <Route component={App} onEnter={ appEnter } />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
