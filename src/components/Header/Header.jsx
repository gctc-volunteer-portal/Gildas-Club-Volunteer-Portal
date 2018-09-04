import React, { Component } from 'react';
import { triggerLogout } from '../../redux/actions/loginActions';

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

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
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
    return (
      <div className="instructions" id="header">
        <img src="/images/GCTC_Logo.jpg" alt="Gilda's Club Twin Cities Logo" height="150" />

        <div id="quote">
          <p>Life is about not knowing, having to change, taking the moment and making the best of it, without knowing what's going to happen next.
        <br />
            —Gilda Radner</p>
        </div>
        <div id="tools">
          <div className={this.props.classes.row}>
            <Avatar className={this.props.classes.avatar}>H</Avatar>
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
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Header);
