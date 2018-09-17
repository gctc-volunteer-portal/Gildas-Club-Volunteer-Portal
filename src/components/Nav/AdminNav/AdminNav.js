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
    backgroundColor: '#DE2027',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    color: 'blue'
    //  grid-column: 1 / 1;
  },
  navIcon: {
    color: 'white',
  }
}

class AdminNav extends React.Component {
  
  render(){

return(

  <div className="navbar">
  
      
  {/* <ul className="nav"> */}
   <BottomNavigation
   showLabels
   className={this.props.classes.nav}
   >
   <BottomNavigationAction className={this.props.classes.navIcon} component={Link} to="/manage_volunteers"  label="Manage Volunteers" icon={ <AssignmentInd />}/>
   <BottomNavigationAction className={this.props.classes.navIcon} component={Link} to="/manage_announcements" label="Manage Announcements" icon={<Announcement/>}/>
   <BottomNavigationAction className={this.props.classes.navIcon} component={Link} to="/manage_opportunities" label="Manage Opportunities" icon={<Assignment/>}/>
    </BottomNavigation>
</div>

    );
  }
}
  

export default (withStyles(styles)(AdminNav));