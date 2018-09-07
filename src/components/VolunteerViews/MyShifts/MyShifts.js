import React, { Component } from 'react';
import { connect } from 'react-redux';

import VolunteerNav from '../../Nav/VolunteerNav/VolunteerNav'
import Header from '../../Header/Header';
import MyShiftsCard from '../MyShiftsCard/MyShiftsCard';
import VolunteerOpportunityDialog from '../VolunteerOpportunityDialog/VolunteerOpportunityDialog';

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
      this.props.history.push('home');
    }
  }


  render() {

    let mappedMyShfits = this.props.shifts.map((shift, index) => {
      return (
        <MyShiftsCard shift={shift} key={index} />
      )
    })

    let content = null;

    if (this.props.user.email) {
      content = mappedMyShfits;
    }

    return (
      <div>
        <Header />
        <VolunteerNav />
        <h1>My Shift!!</h1>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyShifts);
