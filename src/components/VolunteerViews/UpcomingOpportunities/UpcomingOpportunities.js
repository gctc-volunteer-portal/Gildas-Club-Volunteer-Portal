import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import VolunteerNav from '../../Nav/VolunteerNav/VolunteerNav'
import TextField from '@material-ui/core/TextField'
import OpportunitiesCard_AdminView from '../../OpportunitiesCard_AdminView/OpportunitiesCard_AdminView.js';
import { USER_ACTIONS } from '../../../redux/actions/userActions'

function searchingFor(term) {
  return function (opportunity) {
      if (opportunity.title) {
          return opportunity.title.toLowerCase().includes(term.toLowerCase()) || !term;
      }
  }
}

class UpcomingOpportunities extends Component {
  constructor(props) {
      super(props);
      this.state = {
          term: '',
         
      }
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
      this.props.dispatch({ type: 'GET_MY_VOLUNTEER_EVENTS' })
  }

  componentDidUpdate() {
      if (!this.props.user.isLoading && this.props.user.email === null) {
          this.props.history.push('/home');
          console.log(this.props.state);
      }
  }

  searchHandler(event) {
      this.setState({
          term: event.target.value
      })
  }

  handleClickOpen = (id) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      let content = null;
      
      let myOpportunities = this.props.myEvents.filter(searchingFor(this.state.term)).map((opportunity, index) => {
          return (<OpportunitiesCard_AdminView key={index}
              opportunity={opportunity} admin={false}
          />)
      })

      if (this.props.user.email) {
          content = (
              <div>
                  <div>
                      {myOpportunities}
                  </div>
              </div>
          );
      }

      return (
          <div>
              <Header admin={false} />
              <VolunteerNav />
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
              {content}
          </div>
      );
  }
}

const mapStateToProps = state => ({
  myEvents: state.myAvailableEventsReducer,
  user: state.user
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UpcomingOpportunities);

