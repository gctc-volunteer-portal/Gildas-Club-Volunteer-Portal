import React, { Component } from 'react';
import { withStyles, FormControlLabel, Radio, RadioGroup, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
//date picker component and css file from react-datepicker
import moment from 'moment';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { DatePicker, TimePicker } from 'material-ui-pickers';

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

class EditOpportunityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.opportunityToUpdate.title,
      start_time: this.props.opportunityToUpdate.start_time,
      end_time: this.props.opportunityToUpdate.end_time,
      address_line1: this.props.opportunityToUpdate.address_line1,
      address_line2: this.props.opportunityToUpdate.address_line2,
      city: this.props.opportunityToUpdate.city,
      state: this.props.opportunityToUpdate.state,
      zip: this.props.opportunityToUpdate.zip,
      description: this.props.opportunityToUpdate.description,
      date: this.props.opportunityToUpdate.date,
      status: this.props.opportunityToUpdate.status,
      private_notes: this.props.opportunityToUpdate.private_notes,
      max_volunteers: this.props.opportunityToUpdate.max_volunteers,
      certification_needed: this.props.opportunityToUpdate.certification_needed.toString(),
      upload_image: this.props.opportunityToUpdate.upload_image
    }
  }

  componentDidMount(){
    this.config = {
      cloud_name: "dhdgecggi",
      api_key: "772513869339438",
      api_secret: "G89kYxt7M_xdj96VQu6h9fMcZyg",
      upload_preset: 'gohibjbe'
    }
  }

  openCloudinary = () => {
    window.cloudinary.openUploadWidget(this.config, (error, result) => {
        console.log(error, result);
        if (result) {
          // console.log(result.info.secure_url);
            let cloudinaryUrl = result.info.secure_url;
            console.log(cloudinaryUrl);
            this.setState({
                // store url to local state BEFORE disptaching an action
                ...this.state,
                upload_image: cloudinaryUrl
            })
        }
    })
    console.log(this.state.uploadImage);
    
}

  handleDateChange = (date) => {
    this.setState({
      date: date
    });
  }

  handleEndTimeChange = (time) => {
    this.setState({
      end_time: moment(time).format('HH:mm:ss')
    });
  }

  handleStartTimeChange = (time) => {
    this.setState({
      start_time: moment(time).format('HH:mm:ss')
    });
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  
  updateOpportunity = () => {
    this.props.dispatch({
      type: 'UPDATE_OPPORTUNITY', payload:
      {
        opportunityId: this.props.opportunityId,
        updateOpportunityData: this.state
      }
    })

    this.props.closeEditOpportunity();
  }

  render() {
    console.log(this.props.opportunityToUpdate.upload_image);
    
    // map through certifications list, which is stored on redux store, and display them on DOM
    const certificationsList = this.props.certificates.map((certificate, index) => {
      return (
        <FormControlLabel key={index} value={certificate.id.toString()} control={<Radio />} label={certificate.certification_name} />
      )
    })

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
{/* // <p>{JSON.stringify(this.props.opportunityToUpdate.upload_image)}</p> */}
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
            value={moment(this.state.start_time, 'HH:mm:ss')}
            onChange={this.handleStartTimeChange}
            className={this.props.classes.datePicker}
          />

          {/* Input for volunteer opportunity end time */}

          <TimePicker
            autoOk
            keyboard
            label="End Time"
            format="h:mm a"
            value={moment(this.state.end_time, 'HH:mm:ss')}
            onChange={this.handleEndTimeChange}
            className={this.props.classes.datePicker}
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
            placeholder={this.props.opportunityToUpdate.zip.toString() || ''}
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
            placeholder={this.props.opportunityToUpdate.max_volunteers.toString() || ''}
            onChange={this.handleInputChangeFor('max_volunteers')}
          />
          {/* Input to upload image for volunteer opportunity */}
          <TextField
            label="Upload Image"
            type="text"
            name=""
            fullWidth
            placeholder={this.props.opportunityToUpdate.upload_image}
            InputLabelProps={{
              shrink: true,
            }}
          onChange={this.handleInputChangeFor(this.state.upload_image)}
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
            value={this.state.description}
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
            onClick={this.updateOpportunity}
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

            <Button
            className={this.props.classes.button}
            onClick={this.openCloudinary}
            variant="raised"
            color="primary"
          >
            Update Image
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

const StyledEditOpportunityForm = withStyles(styles)(EditOpportunityForm);

export default connect(mapStateToProps)(StyledEditOpportunityForm);