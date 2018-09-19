import React from 'react';
import { Link } from 'react-router-dom';
import '../VolunteerNav/volunteerNav.css'
import Announcement from '@material-ui/icons/Announcement';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Assignment from '@material-ui/icons/Assignment';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  nav:{
    backgroundColor: '#d3d3d3',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  navIcon: {
    color: '#e44c52',
  }
}

class AdminNav extends React.Component {

  render() {

    return (

      <div className="navbar">
        <BottomNavigation
          showLabels
          className={this.props.classes.nav}
        >
          <BottomNavigationAction className={this.props.classes.navIcon} component={Link} to="/manage_opportunities" label="Manage Opportunities" icon={<Assignment />} />
          <BottomNavigationAction className={this.props.classes.navIcon} component={Link} to="/manage_volunteers" label="Manage Volunteers" icon={<AssignmentInd />} />
          <BottomNavigationAction className={this.props.classes.navIcon} component={Link} to="/manage_announcements" label="Manage Announcements" icon={<Announcement />} />
        </BottomNavigation>
      </div>

    );
  }
}


export default (withStyles(styles)(AdminNav));