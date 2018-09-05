import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      primary_phone: '',
      secondary_phone: '',
      street_address1: '',
      street_address2: '',
      city: '',
      state: '',
      zip: 0,
      regular_basis: false,
      specific_event: false,
      as_needed: false,
      limitations_allergies: '',
      why_excited: '',
      employer: '',
      job_title: '',
      date_of_birth: '',
      active: true,
      access_level: 1,
      admin_notes: '',
      message: ''
    }
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a email and password!',
      });
    } else {
      const body = {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        primary_phone: this.state.primary_phone,
        secondary_phone: this.state.secondary_phone,
        street_address1: this.state.street_address1,
        street_address2: this.state.street_address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        regular_basis: this.state.regular_basis,
        specific_event: this.state.specific_event,
        as_needed: this.state.as_needed,
        limitations_allergies: this.state.limitations_allergies,
        why_excited: this.state.why_excited,
        employer: this.state.employer,
        job_title: this.state.job_title,
        date_of_birth: this.state.date_of_birth,
        active: this.state.active,
        access_level: this.state.access_level,
        admin_notes: this.state.admin_notes
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The email might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
       <RegistrationForm
         handleInputChangeFor={this.handleInputChangeFor}
         userRegistrationInfo={this.state}
         registerUser={this.registerUser}
       />
      </div>
    );
  }
}

export default RegisterPage;

