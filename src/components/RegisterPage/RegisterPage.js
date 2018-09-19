import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

import Header from '../Header/Header';
import swal from 'sweetalert';


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
      zip: '',
      regular_basis: false,
      specific_event: false,
      as_needed: false,
      limitations_allergies: '',
      why_excited: '',
      employer: '',
      job_title: '',
      date_of_birth: null,
      active: true,
      access_level: 1,
      admin_notes: '',
      message: ''
    }
  }

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.email === '' || this.state.email === null || this.state.email === undefined) {
      swal(
        {
          text:
            `Please enter a valid email.`,
          icon: "warning",
          color: 'primary',
        });
    } else if (this.state.password === '' || this.state.password === null || this.state.password === undefined || this.state.password.length < 8) {
      swal(
        {
          text:
          `Please enter a valid password. It must contain a minimum of 8 characters.`,
          icon: "warning",
          color: 'primary',
        });
    } else if (this.state.primary_phone === '' || this.state.primary_phone === null || this.state.primary_phone === undefined) {
      swal(
        {
          text:
          `Please enter a valid phone number.`,
          icon: "warning",
          color: 'primary',
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


  handleDateOfBirthChange = (date) => {
    this.setState({
      date_of_birth: date
    });
  }

  handleRegularBasis = () => {
    this.setState({
      regular_basis: !this.state.regular_basis
    });
  }
  handleSpecificEvent = () => {
    this.setState({
      specific_event: !this.state.specific_event
    });
  }
  handleAsNeeded = () => {
    this.setState({
      as_needed: !this.state.as_needed
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
        <Header />
        {this.renderAlert()}
        <RegistrationForm
          handleDateOfBirthChange={this.handleDateOfBirthChange}
          handleRegularBasis={this.handleRegularBasis}
          handleSpecificEvent={this.handleSpecificEvent}
          handleAsNeeded={this.handleAsNeeded}
          handleInputChangeFor={this.handleInputChangeFor}
          userRegistrationInfo={this.state}
          registerUser={this.registerUser}
        />
      </div>
    );
  }
}

export default RegisterPage;

