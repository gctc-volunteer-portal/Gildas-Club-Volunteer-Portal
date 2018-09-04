import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/VolunteerNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import OpportunitiesCard_AdminView from '../OpportunitiesCard_AdminView/OpportunitiesCard_AdminView';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'GET_EVENTS'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          <p>
            Info Page
          </p>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        <OpportunitiesCard_AdminView/>
       
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
