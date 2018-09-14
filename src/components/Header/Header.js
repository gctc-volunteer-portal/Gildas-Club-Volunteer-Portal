import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';

import './header.css';

const styles = {
 
  avatar: {
    margin: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
  }
};


class Header extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('/home');
  }

  goToVolunteer = () => {
    this.props.history.push('/my_shifts');
  }

  goToAdmin = () => {
    this.props.history.push('/manage_volunteers');
  }

  render() {

    let tools = null;

    let viewButton = null;

    let logoutButton = (
      <Button variant="outlined" color="secondary" size="small" fullWidth={false} className={this.props.classes.button}
        onClick={this.logout}
      >
        Log Out
      </Button>)

    let initials = "V";

    if (this.props.user.first_initial || this.props.user.last_initial) {
      initials = `${this.props.user.first_initial}${this.props.user.last_initial}`;
    }

    if (this.props.admin) {
      viewButton = (
        <Button variant="outlined" color="secondary" size="small" fullWidth={false} className={this.props.classes.button}
          onClick={this.goToVolunteer}
        >
          My Volunteer Tools
      </Button>
      )
    }
    else {
      viewButton = (
        <Button variant="outlined" color="secondary" size="small" fullWidth={false} className={this.props.classes.button}
          onClick={this.goToAdmin}
        >
          My Manager Tools
    </Button>
      )
    }

    if (this.props.user.access_level === 1) {
      tools = (
        <React.Fragment>
          <div className={this.props.classes.row}>
            <Avatar className={this.props.classes.avatar}>{initials}</Avatar>
          </div>
          {logoutButton}
        </React.Fragment>
      )
    }

    if (this.props.user.access_level === 2) {
      tools = (
        <React.Fragment>
          <div className={this.props.classes.row}>
            <Avatar className={this.props.classes.avatar}>{initials}</Avatar>
          </div>
          {logoutButton}
          {viewButton}
        </React.Fragment>
      )
    }

    if (this.props.user.access_level === 3) {
      tools = (
        <React.Fragment>
          {logoutButton}
        </React.Fragment>
      )
    }

    return (
      <div className="instructions" id="header">
        <img src="/images/GCTC_Logo.jpg" onClick={() => {this.props.history.push('/home')}} alt="Gilda's Club Twin Cities Logo" height="150" />
        <div id="quote">
          <p>Life is about not knowing, having to change, taking the moment and making the best of it, without knowing what's going to happen next.
        <br />
            —Gilda Radner</p>
        </div>
        <div id="tools">
          {tools}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const connectedHeader = withRouter(connect(mapStateToProps)(Header));
export default withStyles(styles)(connectedHeader);