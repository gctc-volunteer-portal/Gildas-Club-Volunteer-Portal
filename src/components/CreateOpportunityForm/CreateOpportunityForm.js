import React, { Component } from 'react';
import { withStyles, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button } from '@material-ui/core';
import { RadioButtonUncheckedIcon, RadioButtonCheckedIcon } from '@material-ui/icons/RadioButtonUnchecked';
import { connect } from 'react-redux';


import '../CreateOpportunityForm/CreateOpportunityForm.css';

const styles = {
  formContainer: {
    margin: '1rem',
    textAlign: 'center',
    width: '100%',
    // height: '50vh',
    // width: '500px',
  },
  formControl: {
    width: '100%',
  },
  button: {
    margin: '1rem'
  },
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
      certifications_needed: null,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CERTIFICATIONS_LIST' });
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  addOpportunity = () => {
    this.props.dispatch({ type: 'ADD_OPPORTUNITY', payload: this.state });
  }
  render() {
    console.log(this.state, 'local state')
    const certificationsList = this.props.certificates.map((certificate, index) => {
      return (
        <FormControlLabel key={index} value={certificate.id.toString()} control={<Radio />} label={certificate.certification_name} />
      )
    })
    return (
      <React.Fragment>
        {/* <form
          className={this.props.classes.formContainer}
          onSubmit={this.props.registerUser}>
          <FormControl className={this.props.classes.formControl}> */}
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

        <RadioGroup
          name="deliveryType"
          value={this.state.certifications_needed}
          onChange={this.handleInputChangeFor('certifications_needed')}>
          {certificationsList}
        </RadioGroup>

        <Button
          className={this.props.classes.button}
          onClick={this.addOpportunity}
          variant="raised"
          color="primary"
        >
          Create
          </Button>
        <Button
          className={this.props.classes.button}
          onClick={this.props.closeCreateEvent}
          variant="raised"
          color="primary"
        >
          Cancel
            </Button>
        {/* </FormControl>
        </form> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  certificates: state.certificationsReducer.certifications,
});

const StyledCreateOpportunityForm = withStyles(styles)(CreateOpportunityForm)

export default connect(mapStateToProps)(StyledCreateOpportunityForm);
