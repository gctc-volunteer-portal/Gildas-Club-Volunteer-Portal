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
            <Button
              type="submit"
              onClick={this.returnHome}
              variant="raised"
              color="primary"
            >
              Register
              </Button>
          </FormControl>
        </form>
      </React.Fragment>
    )
  }
}
export default withRouter(RegistrationForm);