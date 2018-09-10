import React, { Component } from 'react';
import { withStyles, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
//date picker component and css file from react-datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

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
};

class EditOpportunityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start_time: null,
      end_time: null,
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: null,
      description: '',
      date: null,
      status: 1,
      private_notes: '',
      max_volunteers: null,
      certification_needed: null,
    }
  }

  componentDidMount() {
    this.setOldValues();
  }

  setOldValues = () => {
    const oldOpportunityTitle = this.props.opportunityToUpdate.title;
    const oldOpportunityStartTime = this.props.opportunityToUpdate.start_time;
    const oldOpportunityEndTime = this.props.opportunityToUpdate.end_time;
    const oldOpportunityAddressLine1 = this.props.opportunityToUpdate.address_line1;
    const oldOpportunityAddressLine2 = this.props.opportunityToUpdate.address_line2;
    const oldOpportunityCity = this.props.opportunityToUpdate.city;
    const oldOpportunityState = this.props.opportunityToUpdate.state;
    const oldOpportunityZip = this.props.opportunityToUpdate.zip;
    const oldOpportunityDescription = this.props.opportunityToUpdate.description;
    const oldOpportunityDate = this.props.opportunityToUpdate.date;
    const oldOpportunityStatus = this.props.opportunityToUpdate.status;
    const oldOpportunityPrivateNotes = this.props.opportunityToUpdate.private_notes;
    const oldOpportunityMaxVolunteers = this.props.opportunityToUpdate.max_volunteers;
    const oldOpportunityCertificationNeeded = this.props.opportunityToUpdate.certification_needed;

    this.setState({
      title: oldOpportunityTitle,
      start_time: oldOpportunityStartTime,
      end_time: oldOpportunityEndTime,
      address_line1: oldOpportunityAddressLine1,
      address_line2: oldOpportunityAddressLine2,
      city: oldOpportunityCity,
      state: oldOpportunityState,
      zip: oldOpportunityZip,
      description: oldOpportunityDescription,
      date: oldOpportunityDate,
      status: oldOpportunityStatus,
      private_notes: oldOpportunityPrivateNotes,
      max_volunteers: oldOpportunityMaxVolunteers,
      certification_needed: oldOpportunityCertificationNeeded.toString(),
    })
  }

  handleDateChange = (date) => {
    this.setState({
      date: date
    });
  }

  handleEndTimeChange = (time) => {
    this.setState({
      end_time: time
    });
  }

  handleStartTimeChange = (time) => {
    this.setState({
      start_time: time
    });
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  // updateEvent = (event) => {
  //   event.preventDefault();
  //   this.props.dispatch(triggerUpdateEvent(this.props.eventId, this.state))
  //   this.props.handleCloseModal();
  // }

  render() {
    console.log(this.props.opportunityToUpdate, 'opportunity to update')
    console.log(this.state, 'local state edit opportunity form')
    // map through certifications list, which is stored on redux store, and display them on DOM
    const certificationsList = this.props.certificates.map((certificate, index) => {
      return (
        <FormControlLabel key={index} value={certificate.id.toString()} control={<Radio />} label={certificate.certification_name} />
      )
    })

    return (
      <React.Fragment>
        <TextField
          label="Opportunity Name"
          type="text"
          name="title"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.title}
          onChange={this.handleInputChangeFor('title')}
        />
        {/* Input for volunteer opportunity date */}
        <DatePicker
          selected={moment(this.state.date).utc()}
          onChange={this.handleDateChange}
          dateFormat="ddd, MMM D, YYYY"
          placeholderText={
            moment(this.props.opportunityToUpdate.date).utc()
              .format("ddd, MMM D, YYYY")}
        />

        {/* Input for volunteer opportunity start time */}

        {/* <DatePicker
          selected={moment(this.state.start_time).utc()}
          onChange={this.handleStartTimeChange}
          dateFormat="h:mm A"
          placeholderText={
            moment(this.props.opportunityToUpdate.start_time).utc().format("h:mm A")}
        /> */}

        <TextField
          label="Start Time"
          type="time"
          name="start_time"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          placeholder={moment(this.props.opportunityToUpdate.start_time).utc().format("h:mm A")}
          onChange={this.handleInputChangeFor('start_time')}
        />

        {/* Input for volunteer opportunity end time */}
        <TextField
          label="End Time"
          type="time"
          name="end_time"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          placeholder={this.props.opportunityToUpdate.end_time}
          onChange={this.handleInputChangeFor('end_time')}
        />
        {/* Input for volunteer opportunity street address 1 */}
        <TextField
          label="Street Address 1"
          type="text"
          name="address_line1"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.address_line1}
          onChange={this.handleInputChangeFor('address_line1')}
        />
        {/* Input for volunteer opportunity street address 2 */}
        <TextField
          label="Street Address 2"
          type="text"
          name="address_line2"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.address_line2}
          onChange={this.handleInputChangeFor('address_line2')}
        />
        {/* Input for volunteer opportunity location city */}
        <TextField
          label="City"
          type="text"
          name="city"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.city}
          onChange={this.handleInputChangeFor('city')}
        />
        {/* Input for volunteer opportunity location State */}
        <TextField
          label="State"
          type="text"
          name="state"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.state}
          onChange={this.handleInputChangeFor('state')}
        />
        {/* Input for volunteer opportunity location zipcode  */}
        <TextField
          label="Zip Code"
          type="number"
          name="zip"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.zip.toString()}
          onChange={this.handleInputChangeFor('zip')}
        />
        {/* Input for # of volunteers needed for this volunteer opportunity */}
        <TextField
          label="# of Volunteers Needed"
          type="number"
          name="max_volunteers"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.max_volunteers.toString()}
          onChange={this.handleInputChangeFor('max_volunteers')}
        />
        {/* Input to upload image for volunteer opportunity */}
        <TextField
          label="Upload Image"
          type="text"
          name=""
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        // onChange={this.handleInputChangeFor('')}
        />
        {/* Input for description of volunteer opportunity */}
        <TextField
          label="Opportunity Description"
          type="text"
          name=""
          fullWidth
          multiline
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={this.props.opportunityToUpdate.description}
          onChange={this.handleInputChangeFor('description')}
        />
        {/* Radio inputs to select required certification */}
        <RadioGroup
          name="deliveryType"
          value={this.state.certification_needed}
          placeholder={this.props.opportunityToUpdate.certification_needed.toString()}
          onChange={this.handleInputChangeFor('certification_needed')}>
          {certificationsList}
        </RadioGroup>
        {/* Create Volunteer Opportunity */}
        <Button
          className={this.props.classes.button}
          // onClick={this.addOpportunity}
          variant="raised"
          color="primary"
        >
          Update
          </Button>
        {/* Cancel Creating Volunteer Opportunity */}
        <Button
          className={this.props.classes.button}
          onClick={this.props.closeEditOpportunity}
          variant="raised"
          color="primary"
        >
          Cancel
            </Button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  state: state,
  certificates: state.certificationsReducer.certifications,
});

const StyledEditOpportunityForm = withStyles(styles)(EditOpportunityForm);

export default connect(mapStateToProps)(StyledEditOpportunityForm);