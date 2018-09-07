import React, { Component } from 'react';
import { withStyles, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';

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

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  render() {
    const certificationsList = this.props.certificates.map((certificate, index) => {
      return (
        <FormControlLabel key={index} value={certificate.id.toString()} control={<Radio />} label={certificate.certification_name} />
      )
    })
    return (
      <React.Fragment>
        {/* <form
          className={this.props.classes.formContainer}
          onSubmit={this.props.registerUser}> */}
        {/* <FormControl className={this.props.classes.formControl}> */}
          {/* Input for volunteer opportunity name */}
          <TextField
            label="Opportunity Name"
            type="text"
            name="title"
            fullWidth
            onChange={this.handleInputChangeFor('title')}
          />
          {/* Input for volunteer opportunity date */}
          <TextField
            label="Date"
            type="date"
            name="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={this.handleInputChangeFor('date')}
          />
          {/* Input for volunteer opportunity start time */}
          <TextField
            label="Start Time"
            type="time"
            name="start_time"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
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
            onChange={this.handleInputChangeFor('end_time')}
          />
          {/* Input for volunteer opportunity street address 1 */}
          <TextField
            label="Street Address 1"
            type="text"
            name="address_line1"
            fullWidth
            onChange={this.handleInputChangeFor('address_line1')}
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
            onChange={this.handleInputChangeFor('city')}
          />
          {/* Input for volunteer opportunity location State */}
          <TextField
            label="State"
            type="text"
            name="state"
            fullWidth
            onChange={this.handleInputChangeFor('state')}
          />
          {/* Input for volunteer opportunity location zipcode  */}
          <TextField
            label="Zip Code"
            type="text"
            name="zip"
            fullWidth
            onChange={this.handleInputChangeFor('zip')}
          />
          {/* Input for # of volunteers needed for this volunteer opportunity */}
          <TextField
            label="# of Volunteers Needed"
            type="number"
            name="max_volunteers"
            fullWidth
            onChange={this.handleInputChangeFor('max_volunteers')}
          />
          {/* Input to upload image for volunteer opportunity */}
          <TextField
            label="Upload Image"
            type="text"
            name=""
            fullWidth
          // onChange={this.handleInputChangeFor('')}
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
          {/* Radio inputs to select required certification */}
          <RadioGroup
            name="deliveryType"
            value={this.state.certification_needed}
            onChange={this.handleInputChangeFor('certification_needed')}>
            {certificationsList}
          </RadioGroup>
          {/* Create Volunteer Opportunity */}
          <Button
            className={this.props.classes.button}
            onClick={this.addOpportunity}
            variant="raised"
            color="primary"
          >
            Create
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
        {/* </FormControl> */}
        {/* </form> */}
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