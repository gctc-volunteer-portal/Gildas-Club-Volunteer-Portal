import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import VolunteerNav from '../../Nav/VolunteerNav/VolunteerNav'
import Header from '../../Header/Header';
import OpportunitiesCard from '../../OpportunitiesCard_AdminView/OpportunitiesCard_AdminView';
import { USER_ACTIONS } from '../../../redux/actions/userActions'
// import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
    shifts: state.opportunitiesReducer.singleVolunteerOpportunities
});

function searchingFor(term) {
  return function (opportunity) {
      if (opportunity.title) {
          return opportunity.title.toLowerCase().includes(term.toLowerCase()) || !term;
      }
  }
}

class MyShifts extends Component {
  constructor(props) {
  super(props);
  this.state = {
      term: '',
  }
  this.searchHandler = this.searchHandler.bind(this);
}

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'FETCH_SINGLE_VOLUNTEER_OPPORTUNITIES'})
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }
  searchHandler(event) {
    this.setState({
        term: event.target.value
    })
}


  render() {

    let mappedMyShifts = this.props.shifts.filter(searchingFor(this.state.term)).map((shift, index) => {
      return (
        <OpportunitiesCard opportunity={shift} key={index} />
      )
    })

    let content = null;

    if (this.props.user.email) {
      content = mappedMyShifts;
    }

    return (
      <div>
        <Header />
        <VolunteerNav />
        <h1>My Shift!!</h1>
        <div style={{ height: 100 }}>
                  <TextField
                      id="full-width"
                      label=""
                      InputLabelProps={{
                          shrink: true,
                      }}
                      placeholder="Search..."
                      helperText="What opportunity are you looking for?"
                      width='50'
                      margin="normal"
                      onChange={this.searchHandler}
                      value={this.state.term}
                  />
              </div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyShifts);
