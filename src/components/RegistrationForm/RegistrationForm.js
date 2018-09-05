import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { withStyles, FormControl, FormLabel, TextField, Button } from '@material-ui/core';
class RegistrationForm extends Component {

  returnHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.registerUser}>
          <h1>Register User</h1>
          <FormControl>
            <TextField
              label="Email"
              type="text"
              name="email"
              value={this.props.userRegistrationInfo.email}
              onChange={this.props.handleInputChangeFor('email')}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={this.props.userRegistrationInfo.password}
              onChange={this.props.handleInputChangeFor('password')}
            />
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={this.props.userRegistrationInfo.first_name}
              onChange={this.props.handleInputChangeFor('first_name')}
            />
            <TextField
              label="Middle Name"
              type="text"
              name="middle_name"
              value={this.props.userRegistrationInfo.middle_name}
              onChange={this.props.handleInputChangeFor('middle_name')}
            />
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={this.props.userRegistrationInfo.last_name}
              onChange={this.props.handleInputChangeFor('last_name')}
            />
            <TextField
              label="Primary Phone"
              type="text"
              name="primary_phone"
              value={this.props.userRegistrationInfo.primary_phone}
              onChange={this.props.handleInputChangeFor('primary_phone')}
            />
            <TextField
              label="Secondary Phone"
              type="text"
              name="secondary_phone"
              value={this.props.userRegistrationInfo.secondary_phone}
              onChange={this.props.handleInputChangeFor('secondary_phone')}
            />
            {/* <TextField
              label="Password"
              type="text"
              name="password"
              value={this.props.userRegistrationInfo.password}
              onChange={this.props.handleInputChangeFor('password')}
            />
            <TextField
              label="Password"
              type="text"
              name="password"
              value={this.props.userRegistrationInfo.password}
              onChange={this.props.handleInputChangeFor('password')}
            />
            <TextField
              label="Password"
              type="text"
              name="password"
              value={this.props.userRegistrationInfo.password}
              onChange={this.props.handleInputChangeFor('password')}
            />
            <TextField
              label="Password"
              type="text"
              name="password"
              value={this.props.userRegistrationInfo.password}
              onChange={this.props.handleInputChangeFor('password')}
            />
            <TextField
              label="Password"
              type="text"
              name="password"
              value={this.props.userRegistrationInfo.password}
              onChange={this.props.handleInputChangeFor('password')}
            /> */}
            <Button
              type="submit"
              variant="raised"
              color="primary"
            >
              Register
              </Button>
            <Button
              type="button"
              onClick={this.returnHome}
              variant="raised"
              color="primary"
            >
              Cancel
              </Button>
          </FormControl>
        </form>
      </React.Fragment>
    )
  }
}
export default withRouter(RegistrationForm);