import React, { Component } from 'react';
import { withStyles, FormControlLabel, Radio, RadioGroup, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { DatePicker, TimePicker } from 'material-ui-pickers';
import '../CreateOpportunityForm/CreateOpportunityForm.css';
import swal from 'sweetalert';

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
  }
};

class CreateOpportunityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start_time: null,
      end_time: null,
      address_line1: '10560 Wayzata Blvd',
      address_line2: '',
      city: 'Minnetonka',
      state: 'MN',
      zip: 55305,
      description: '',
      date: null,
      status: 1,
      uploadImage: 'https://res.cloudinary.com/dhdgecggi/image/upload/v1536937033/Crowdrise_default.png',
      private_notes: '',
      max_volunteers: 1,
      certification_needed: 13,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_CERTIFICATIONS_LIST' });
    this.config = {
      cloud_name: process.env.REACT_APP_CLOUD_NAME,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_API_KEY_SECRET,
      upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
   }
  }
  openCloudinary = () => {
    window.cloudinary.openUploadWidget(this.config, (error, result) => {
      if (result) {

        let cloudinaryUrl = result.info.secure_url || 'https://res.cloudinary.com/dhdgecggi/image/upload/v1536937033/Crowdrise_default.png';
        this.setState({
          // store url to local state BEFORE dispatching an action
          ...this.state,
          uploadImage: cloudinaryUrl
        })
      }
    })


  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleDateChange = (date) => {
    this.setState({
      date: date
    });
  }

  handleEndTimeChange = (time) => {
    this.setState({
      end_time: moment(time).format()
    });
  }

  handleStartTimeChange = (time) => {
    this.setState({
      start_time: moment(time).format()
    });
  }

  // Post new volunteer opportunity to the database
  addOpportunity = () => {
    this.props.dispatch({ type: 'ADD_OPPORTUNITY', payload: this.state });
    this.props.closeCreateEvent();
  }

  validateInputs = () => {
    if (this.state.title === '' || this.state.title === null || this.state.title === undefined) {
      swal(
        {
          text:
            `Please enter a name for this volunteer opportunity.`,
          icon: "warning",
          color: 'primary',
        });
    } else if (this.state.start_time === '' || this.state.start_time === null || this.state.start_time === undefined) {
      swal(
        {
          text:
            `Please enter a start time for this volunteer opportunity`,
          icon: "warning",
          color: 'primary',
        });
    } else if (this.state.end_time === '' || this.state.end_time === null || this.state.end_time === undefined) {
      swal(
        {
          text:
            `Please enter an end time for this volunteer opportunity`,
          icon: "warning",
          color: 'primary',
        });
    } else if (this.state.date === '' || this.state.date === null || this.state.date === undefined) {
      swal(
        {
          text:
            `Please enter a date for this volunteer opportunity`,
          icon: "warning",
          color: 'primary',
        });
    } else {
      this.addOpportunity();
    }
  }

  render() {
    // map through certifications list, which is stored on redux store, and display them on DOM
    const certificationsList = this.props.certificates.map((certificate, index) => {
      return (
        <FormControlLabel key={index} value=
          {certificate.id.toString()} control={<Radio />} label={certificate.certification_name} />

      )
    })

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {/* Input for volunteer opportunity name */}
          <TextField
            label="Opportunity Name"
            type="text"
            name="title"
            fullWidth
            onChange={this.handleInputChangeFor('title')}
            required
          />
          {/* Input for volunteer opportunity date */}

          <DatePicker
            label="Select Date"
            showTodayButton
            maxDateMessage="Date must be less than today"
            format="dddd, MMM D, YYYY"
            value={this.state.date}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
            className={this.props.classes.datePicker}
            autoOk
          />

          {/* Input for volunteer opportunity start time */}


          <TimePicker
            autoOk
            keyboard
            label="Start Time"
            format="h:mm a"
            value={this.state.start_time}
            onChange={this.handleStartTimeChange}
            className={this.props.classes.datePicker}
          />

          {/* Input for volunteer opportunity end time */}
          <TimePicker
            autoOk
            keyboard
            label="End Time"
            format="h:mm a"
            value={this.state.end_time}
            onChange={this.handleEndTimeChange}
            className={this.props.classes.datePicker}
          />

          {/* Input for volunteer opportunity street address 1 */}
          <TextField
            label="Street Address 1"
            type="text"
            name="address_line1"
            fullWidth
            value={this.state.address_line1}
            onChange={this.handleInputChangeFor('address_line1')}
            required

          />
          {/* Input for volunteer opportunity street address 2 */}
          <TextField
            label="Street Address 2"
            type="text"
            name="address_line2"
            fullWidth
            onChange={this.handleInputChangeFor('address_line2')}
          />
          {/* Input for volunteer opportunity location city */}
          <TextField
            label="City"
            type="text"
            name="city"
            fullWidth
            value={this.state.city}
            onChange={this.handleInputChangeFor('city')}
            required

          />
          {/* Input for volunteer opportunity location State */}
          <TextField
            label="State"
            type="text"
            name="state"
            fullWidth
            value={this.state.state}
            onChange={this.handleInputChangeFor('state')}
            required

          />
          {/* Input for volunteer opportunity location zipcode  */}
          <TextField
            label="Zip Code"
            type="number"
            name="zip"
            fullWidth
            value={this.state.zip}
            onChange={this.handleInputChangeFor('zip')}
            required

          />
          {/* Input for # of volunteers needed for this volunteer opportunity */}
          <TextField
            label="# of Volunteers Needed"
            type="number"
            name="max_volunteers"
            fullWidth
            onChange={this.handleInputChangeFor('max_volunteers')}
          />
      
          {/* Input for description of volunteer opportunity */}
          <TextField
            label="Opportunity Description"
            type="text"
            name=""
            fullWidth
            multiline
            onChange={this.handleInputChangeFor('description')}
          />
          <TextField
            label="Admin Notes"
            type="text"
            name=""
            fullWidth
            multiline
            onChange={this.handleInputChangeFor('private_note')}
          />
             <Button
            className={this.props.classes.button}
            onClick={this.openCloudinary}
            variant="raised"
            color="primary"
          >
            Add image
            </Button>
          {/* Radio inputs to select required certification */}
          <RadioGroup
            name="certification"
            value={this.state.certification_needed.toString()}
            onChange={this.handleInputChangeFor('certification_needed')}>
            {certificationsList}
          </RadioGroup>
          {/* Create Volunteer Opportunity */}
          <Button
            className={this.props.classes.button}
            // onClick={this.addOpportunity}
            onClick={this.validateInputs}
            variant="raised"
            size="small"
            color="primary"
          >
            Create
          </Button>
          {/* Cancel Creating Volunteer Opportunity */}
          <Button
            className={this.props.classes.button}
            onClick={this.props.closeCreateEvent}
            variant="raised"
            size="small"
            color="primary"
          >
            Cancel
            </Button>
        </MuiPickersUtilsProvider>
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