import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import ManageOpportunitiesPage from './components/ManageOpportunitiesPage/ManageOpportunitiesPage';


import './styles/main.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DE2027',
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
})

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route
            path="/home"
            component={LoginPage}
          />
          <Route
            path="/register"
            component={RegisterPage}
          />
          <Route
            path="/user"
            component={UserPage}
          />
          <Route
            path="/info"
            component={InfoPage}
          />
          {/* OTHERWISE (no path!) */}
          {/* <Route render={() => <h1>404</h1>} /> */}
          <Route
            path="/manage_opportunities"
            component={ManageOpportunitiesPage}
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
