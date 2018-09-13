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
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    color: 'blue',
    borderStyle: 'solid',
    borderColor: '#DE2027'
    //  grid-column: 1 / 1;
  }
}

class VolunteerNav extends React.Component {
  
  render(){

return(

  <div className="navbar">
  
      
  {/* <ul className="nav"> */}
   <BottomNavigation
   showLabels
   className={this.props.classes.nav}
   >
   <BottomNavigationAction component={Link} to="/my_shifts"  label="My Shifts" icon={ <AssignmentInd />}/>
   <BottomNavigationAction component={Link} to="/announcements" label="Announcements" icon={<Announcement/>}/>
   <BottomNavigationAction component={Link} to="/upcoming_opportunities" label="Upcoming Opportunities" icon={<Assignment/>}/>
    </BottomNavigation>
</div>

    );
  }
}
  

export default (withStyles(styles)(VolunteerNav));
