import React, { Component } from 'react';
import { withStyles, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button } from '@material-ui/core';
import '../CreateOpportunityForm/CreateOpportunityForm.css';

const styles = {
  formContainer: {
    margin: '1rem',
    height: '50vh',
    width: '500px',
  },
  formControl: {
    width: '100%',
  },
  button: {
    textAlign: 'center',
    margin: '1rem'
  },
  header: {
    textAlign: 'center',

  }
};

class CreateOpportunityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start_time: '',
      end_time: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: '',
      description: '',
      date: null,
      status: 1,
      private_notes: '',
      max_volunteers: null,
      certifications_needed: null
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <form
          className={this.props.classes.formContainer}
          onSubmit={this.props.registerUser}>
          <FormControl className={this.props.classes.formControl}>
            <TextField
              label="Opportunity Name"
              type="text"
              name="title"
              fullWidth
              // value={this.props.userRegistrationInfo.email}
              onChange={this.handleInputChangeFor('title')}
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              // value={this.props.userRegistrationInfo.password}
              onChange={this.handleInputChangeFor('date')}
            />
            <TextField
              label="Start Time"
              type="time"
              name="start_time"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              // value={this.props.userRegistrationInfo.first_name}
              onChange={this.handleInputChangeFor('start_time')}
            />
            <TextField
              label="End Time"
              type="time"
              name="end_time"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              // value={this.props.userRegistrationInfo.middle_name}
              onChange={this.handleInputChangeFor('end_time')}
            />
            <TextField
              label="Street Address 1"
              type="text"
              name="address_line1"
              fullWidth
              // value={this.props.userRegistrationInfo.street_address1}
              onChange={this.handleInputChangeFor('address_line1')}
            />
            <TextField
              label="Street Address 2"
              type="text"
              name="address_line2"
              fullWidth
              // value={this.props.userRegistrationInfo.street_address2}
              onChange={this.handleInputChangeFor('address_line2')}
            />
            <TextField
              label="City"
              type="text"
              name="city"
              fullWidth
              // value={this.props.userRegistrationInfo.city}
              onChange={this.handleInputChangeFor('city')}
            />
            <TextField
              label="State"
              type="text"
              name="state"
              fullWidth
              // value={this.props.userRegistrationInfo.state}
              onChange={this.handleInputChangeFor('state')}
            />
            <TextField
              label="Zip Code"
              type="text"
              name="zip"
              fullWidth
              // value={this.props.userRegistrationInfo.zip}
              onChange={this.handleInputChangeFor('zip')}
            />
            <TextField
              label="# of Volunteers Needed"
              type="number"
              name="max_volunteers"
              fullWidth
              // value={this.props.userRegistrationInfo.max_volunteers}
              onChange={this.handleInputChangeFor('max_volunteers')}
            />
            <TextField
              label="Upload Image"
              type="text"
              name=""
              fullWidth
            // onChange={this.handleInputChangeFor('')}
            />
            <Button
              className={this.props.classes.button}
              type="submit"
              variant="raised"
              color="primary"
            >
              Create
          </Button>
            <Button
              className={this.props.classes.button}
              type="button"
              onClick={this.props.closeCreateEvent}
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
const StyledCreateOpportunityForm = withStyles(styles)(CreateOpportunityForm)

export default StyledCreateOpportunityForm
