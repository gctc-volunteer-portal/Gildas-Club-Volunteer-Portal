import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button } from '@material-ui/core';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { DatePicker } from 'material-ui-pickers';

// styling
const styles = {
  formContainer: {
    margin: '1rem',
    textAlign: 'center',
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
  button: {
    margin: '1rem'
  },
  datePicker: {
    width: '100%',
    borderColor: 'red',
    textAlign: 'center',
  },
  textField: {
    marginBottom: '1rem',
  },
  checkBoxField: {
    marginBottom: '2rem',
  }
}

class RegistrationForm extends Component {
  
  returnHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>

        {/* registration form below */}
          <form onSubmit={this.props.registerUser}
            className={this.props.classes.formContainer}
          >
            <h1>Register User</h1>
            <FormControl>
             {/* input field for email */}
              <TextField
                label="Email"
                type="email"
                name="email"
                required
                value={this.props.userRegistrationInfo.email}
                onChange={this.props.handleInputChangeFor('email')}
                className={this.props.classes.textField}
              />
             {/* input field for password */}
              <TextField
                label="Password"
                type="password"
                name="password"
                required
                helperText="Minimum of 8 characters"
                value={this.props.userRegistrationInfo.password}
                onChange={this.props.handleInputChangeFor('password')}
                className={this.props.classes.textField}
              />
              {/* input field for first name */}
              <TextField
                label="First Name"
                type="text"
                name="first_name"
                required
                value={this.props.userRegistrationInfo.first_name}
                onChange={this.props.handleInputChangeFor('first_name')}
                className={this.props.classes.textField}
              />
              {/* input field for middle name */}
              <TextField
                label="Middle Name"
                type="text"
                name="middle_name"
                value={this.props.userRegistrationInfo.middle_name}
                onChange={this.props.handleInputChangeFor('middle_name')}
                className={this.props.classes.textField}
              />
              {/* input field for last name */}
              <TextField
                label="Last Name"
                type="text"
                name="last_name"
                required
                value={this.props.userRegistrationInfo.last_name}
                onChange={this.props.handleInputChangeFor('last_name')}
                className={this.props.classes.textField}
              />
              {/* input field for primary phone number */}
              <TextField
                label="Primary Phone"
                type="text"
                name="primary_phone"
                helperText="Format (123) 555-5555"
                required
                value={this.props.userRegistrationInfo.primary_phone}
                onChange={this.props.handleInputChangeFor('primary_phone')}
                className={this.props.classes.textField}
              />
              {/* input field for secondary phone number */}
              <TextField
                label="Secondary Phone"
                type="text"
                name="secondary_phone"
                value={this.props.userRegistrationInfo.secondary_phone}
                onChange={this.props.handleInputChangeFor('secondary_phone')}
                className={this.props.classes.textField}
              />
              {/* input field for street address 1 */}
              <TextField
                label="Street Address 1"
                type="text"
                name="street_address1"
                required
                value={this.props.userRegistrationInfo.street_address1}
                onChange={this.props.handleInputChangeFor('street_address1')}
                className={this.props.classes.textField}
              />
              {/* input field for street address 2 */}
              <TextField
                label="Street Address 2"
                type="text"
                name="street_address2"
                value={this.props.userRegistrationInfo.street_address2}
                onChange={this.props.handleInputChangeFor('street_address2')}
                className={this.props.classes.textField}
              />
              {/* input field for city of residence */}
              <TextField
                label="City"
                type="text"
                name="city"
                required
                value={this.props.userRegistrationInfo.city}
                onChange={this.props.handleInputChangeFor('city')}
                className={this.props.classes.textField}
              />
              {/* input field for state of residence */}
              <TextField
                label="State"
                type="text"
                name="state"
                required
                value={this.props.userRegistrationInfo.state}
                onChange={this.props.handleInputChangeFor('state')}
                className={this.props.classes.textField}
              />
              {/* input field for zip code */}
              <TextField
                label="Zip Code"
                type="text"
                name="zip"
                required
                value={this.props.userRegistrationInfo.zip}
                onChange={this.props.handleInputChangeFor('zip')}
                className={this.props.classes.textField}
              />
              {/* input field for employer */}
              <TextField
                label="Employer"
                type="text"
                name="employer"
                value={this.props.userRegistrationInfo.employer}
                onChange={this.props.handleInputChangeFor('employer')}
                className={this.props.classes.textField}
              />
              {/* input field for job title */}
              <TextField
                label="Job Title"
                type="text"
                name="job_title"
                value={this.props.userRegistrationInfo.job_title}
                onChange={this.props.handleInputChangeFor('job_title')}
                className={this.props.classes.textField}
              />
              {/* date picker input for date of birth */}
              <DatePicker
                label="Date Of Birth"
                required
                openToYearSelection
                keyboard
                clearable
                disableFuture
                format="MMMM D, YYYY"
                value={this.props.userRegistrationInfo.date_of_birth}
                onChange={this.props.handleDateOfBirthChange}
                animateYearScrolling={false}
                className={this.props.classes.checkBoxField}
                autoOk
              />

              {/* Checkbox questions start below */}
              <FormLabel
                className={this.props.classes.checkBoxField}
              >
                Are you interested in volunteering:
              </FormLabel>

              {/* On A Regular Basis */}
              <FormControlLabel
                className={this.props.classes.checkBoxField}
                control={
                  <Checkbox onChange={this.props.handleRegularBasis} value={this.props.regular_basis} />
                }
                label="On A Regular Basis (once a week, twice a month, etc.)"
              />

              {/* For One Specific Event */}
              <FormControlLabel
                className={this.props.classes.checkBoxField}
                control={
                  <Checkbox onChange={this.props.handleSpecificEvent} value={this.props.regular_basis} />
                }
                label="For One Specific Event (annual breakfast, golf event, etc.)"
              />
              {/* As Needed */}
              <FormControlLabel
                className={this.props.classes.checkBoxField}
                control={
                  <Checkbox onChange={this.props.handleAsNeeded} value={this.props.as_needed} />
                }
                label="As Needed (for volunteer committees, special events, or responding to requests for volunteers)"
              />

              {/* health/physical limitations */}
              <FormLabel
                className={this.props.classes.textField}
              >
                List any health/physical limitations, including allergies
              </FormLabel>
              <TextField
                type="text"
                name="limitations_allergies"
                multiline
                fullWidth
                value={this.props.userRegistrationInfo.limitations_allergies}
                onChange={this.props.handleInputChangeFor('limitations_allergies')}
                className={this.props.classes.checkBoxField}
              />

              {/* capturing excitement */}
              <FormLabel
                className={this.props.classes.textField}
              >
                What makes you excited about volunteering with Gilda's Club Twin Cities?
              </FormLabel>
              <TextField
                type="text"
                name="why_excited"
                multiline
                fullWidth
                value={this.props.userRegistrationInfo.why_excited}
                onChange={this.props.handleInputChangeFor('why_excited')}
                className={this.props.classes.checkBoxField}
              />

              {/* register button */}
              <Button
                className={this.props.classes.button}
                type="submit"
                variant="raised"
                color="primary"
              >
                Register
            </Button>

            {/* cancel button - takes user back to landing page */}
              <Button
                className={this.props.classes.button}
                type="button"
                onClick={this.returnHome}
                variant="raised"
                color="primary"
              >
                Cancel
              </Button>
            </FormControl>
          </form>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    )
  }
}

const StyledRegistrationForm = withStyles(styles)(RegistrationForm)

export default withRouter(StyledRegistrationForm);