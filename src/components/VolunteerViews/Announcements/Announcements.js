import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import VolunteerNav from '../../Nav/VolunteerNav/VolunteerNav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import AnnouncementCard from '../../AnnouncementsCard/AnnouncementCard';



const mapStateToProps = state => ({
  user: state.user,
  state
});

class Announcements extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_ANNOUNCEMENTS_LIST'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }


  render() {
   
    let announcementList = this.props.state.announcementsReducer.announcements.map((announcement, index) => {
      return (<AnnouncementCard
                  announcement = {announcement}
                 
      />
      
       
      )
  })


  return (
    <div>
      <Header />
      <VolunteerNav />
      {announcementList}
    </div>
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Announcements);