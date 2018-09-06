import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { withStyles, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button } from '@material-ui/core';
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
            <TextField
              label="Street Address 1"
              type="text"
              name="street_address1"
              value={this.props.userRegistrationInfo.street_address1}
              onChange={this.props.handleInputChangeFor('street_address1')}
            />
            <TextField
              label="Street Address 2"
              type="text"
              name="street_address2"
              value={this.props.userRegistrationInfo.street_address2}
              onChange={this.props.handleInputChangeFor('street_address2')}
            />
            <TextField
              label="City"
              type="text"
              name="city"
              value={this.props.userRegistrationInfo.city}
              onChange={this.props.handleInputChangeFor('city')}
            />
            <TextField
              label="State"
              type="text"
              name="state"
              value={this.props.userRegistrationInfo.state}
              onChange={this.props.handleInputChangeFor('state')}
            />
            <TextField
              label="Zip Code"
              type="text"
              name="zip"
              value={this.props.userRegistrationInfo.zip}
              onChange={this.props.handleInputChangeFor('zip')}
            />
            <TextField
              label="Employer"
              type="text"
              name="employer"
              value={this.props.userRegistrationInfo.employer}
              onChange={this.props.handleInputChangeFor('employer')}
            />
            <TextField
              label="Job Title"
              type="text"
              name="job_title"
              value={this.props.userRegistrationInfo.job_title}
              onChange={this.props.handleInputChangeFor('job_title')}
            />
            <TextField
              label="Date Of Birth"
              type="date"
              name="date_of_birth"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.props.userRegistrationInfo.date_of_birth}
              onChange={this.props.handleInputChangeFor('date_of_birth')}
            />
            <FormLabel>
              Are you interested in volunteering:
              </FormLabel>
            <FormControlLabel
              control={
                <Checkbox onChange={this.props.handleRegularBasis} value={this.props.regular_basis} />
              }
              label="On A Regular Basis (once a week, twice a month, etc.)"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={this.props.handleSpecificEvent} value={this.props.regular_basis} />
              }
              label="For One Specific Event (Annual Breakfast, Golf Event, etc.)"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={this.props.handleAsNeeded} value={this.props.as_needed} />
              }
              label="As needed (for volunteer committees, special events, or responding to requests for volunteers)"
            />

            <FormLabel>
              List any health/physical limitations, including allergies
              </FormLabel>
            <TextField
              type="text"
              name="limitations_allergies"
              fullWidth
              value={this.props.userRegistrationInfo.limitations_allergies}
              onChange={this.props.handleInputChangeFor('limitations_allergies')}
            />
            <FormLabel>
              What makes you excited about volunteering Gildas Club Twin Cities?
              </FormLabel>
            <TextField
              type="text"
              name="why_excited"
              fullWidth
              value={this.props.userRegistrationInfo.why_excited}
              onChange={this.props.handleInputChangeFor('why_excited')}
            />
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