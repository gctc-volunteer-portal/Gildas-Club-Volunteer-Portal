import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

import './header.css';

const styles = {
  avatar: {
    margin: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
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
    console.log('going to volunteer tools');
    this.props.history.push('/home');
  }

  goToAdmin = () => {
    console.log('going to admin tools');
    this.props.history.push('/home');
  }

  render() {

    let tools = null;

    let initials = "V";

    if (this.props.user.first_initial || this.props.user.last_initial) {
      initials = `${this.props.user.first_initial}${this.props.user.last_initial}`;
    }

    if (this.props.user.access_level === 1) {
      tools = (
        <React.Fragment>
          <div className={this.props.classes.row}>
            <Avatar className={this.props.classes.avatar}>{initials}</Avatar>
          </div>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </React.Fragment>
      )
    }

    if (this.props.user.access_level === 2) {
      tools = (
        <React.Fragment>
          <div className={this.props.classes.row}>
            <Avatar className={this.props.classes.avatar}>{initials}</Avatar>
          </div>
          <button
            onClick={this.goToVolunteer}
          >
            My Volunteer Tools
          </button>
          <button
            onClick={this.goToAdmin}
          >
            My Manager Tools
          </button>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </React.Fragment>
      )
    }

    if (this.props.user.access_level === 3) {
      tools = (
        <React.Fragment>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </React.Fragment>
      )
    }

    return (
      <div className="instructions" id="header">
        <img src="/images/GCTC_Logo.jpg" alt="Gilda's Club Twin Cities Logo" height="150" />

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