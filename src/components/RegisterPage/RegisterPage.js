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
      zip: '',
      access_level: 0,
      admin_notes: '',
      active: true,
      regular_basis: false,
      specific_event: false,
      as_needed: false,
      limitations_allergies: '',
      why_excited: '',
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
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
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
 registration-feature
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

