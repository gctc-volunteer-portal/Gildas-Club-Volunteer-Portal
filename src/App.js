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
import ManageOpportunitiesPage from './components/ManageOpportunitiesPage/ManageOpportunitiesPage';
import ManageVolunteersView from './components/ManageVolunteersView/ManageVolunteersView';
import MyShifts from './components/VolunteerViews/MyShifts/MyShifts'
import ManageAnnouncements from './components/ManageAnnouncements/ManageAnnouncements'
import Announcements from './components/VolunteerViews/Announcements/Announcements'
import UpcomingOpportunities from './components/VolunteerViews/UpcomingOpportunities/UpcomingOpportunities';
import ManageVolunteersViewTableHeader from './components/ManageVolunteersViewTableHeader/ManageVolunteersViewTableHeader';
import AdminSingleVolunteerView from './components/AdminSingleVolunteerView/AdminSingleVolunteerView'
import './styles/main.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DE2027',
    },
    secondary: {
      main: '#d3d3d3',
    },
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
          path="/my_shifts"
          component={MyShifts}
        />
        <Route
          path="/manage_announcements"
          component={ManageAnnouncements}
        />
        <Route
          path="/upcoming_opportunities"
          component={UpcomingOpportunities}
        />
        <Route
          path="/manage_volunteers"
          component={ManageVolunteersView}
        />
      
        <Route
          path="/admin_single_volunteer_view"
          component={AdminSingleVolunteerView}
        />
        <Route
          path="/manage_opportunities"
          component={ManageOpportunitiesPage}
        />
         <Route
          path="/announcements"
          component={Announcements}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
