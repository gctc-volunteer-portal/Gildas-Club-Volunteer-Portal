import React, { Component } from 'react';
import { connect } from 'react-redux';

import VolunteerNav from '../../Nav/VolunteerNav/VolunteerNav'
import Header from '../../Header/Header';
import OpportunitiesCardAdminView from '../../OpportunitiesCardAdminView/OpportunitiesCardAdminView';
import { USER_ACTIONS } from '../../../redux/actions/userActions'
// import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
    shifts: state.opportunitiesReducer.singleVolunteerOpportunities
});

class MyShifts extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'FETCH_SINGLE_VOLUNTEER_OPPORTUNITIES'})
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('/home');
    }
  }


  render() {

    let mappedMyShifts = this.props.shifts.map((shift, index) => {
      return (
        <OpportunitiesCardAdminView opportunity={shift} key={index} admin={false} />
      )
    })

    let content = null;

    if (this.props.user.email) {
      if(mappedMyShifts.length > 0) {
        content = mappedMyShifts;

      }
      else {
        content = (<p>Looks like you don't have any shifts yet! Check out Upcoming Opportunities to sign up.</p>)
      }
    }

    return (
      <div>
        <Header admin={false} />
        <VolunteerNav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyShifts);
