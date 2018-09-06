import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router';
import Nav from '../Nav/VolunteerNav/VolunteerNav';
import Header from '../Header/Header'

import { withStyles, FormControl, Input, Avatar ,FormLabel,Chip, Checkbox, NativeSelect, TextField, Button } from '@material-ui/core';
import '../AdminSingleVolunteerView/AdminSingleVolunteer.css';
import VolunteerNav from '../Nav/VolunteerNav/VolunteerNav';

const mapStateToProps = state =>({
  state
})

const styles = {
    text: {
        
       marginBottom: '15px'
    },
    textarea:{
      marginBottom: '25px',
      height: '100px',
      width:'500px',
      borderRadius: '10px',
      fontSize: '15px',
      outline:'none'
      
    },
    formLabel:{
      marginBottom:'5px'
    }
    
   
    
  }


class AdminSingleVolunteerView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          primary_phone: '',
          secondary_phone: '',
          street_address1: '',
          street_address2: '',
          city: '',
          state: '',
          zip: null,
          regular_basis: false,
          specific_event: false,
          as_needed: false,
          limitations_allergies: '',
          why_excited: '',
          employer: '',
          job_title: '',
          date_of_birth: null,
          active: true,
          access_level: 1,
          admin_notes: '',
          message: '',
          chip:{
            color: 'default',
            onDelete: 'none',
            avatar: 'none',
            variant: 'default',
          }
        }
      }
  // returnHome = () => {
  //   this.props.history.push('/')
  // }

  handleInputChangeFor = (propertyName) => (event) => {
      this.setState({
          [propertyName]: event.target.value
      })
  }
  //for check boxes
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  updateVolunteerInfo = (event) => {
    event.preventDefault()
    console.log(this.state);
    this.props.dispatch({
       type:'UPDATE_VOLUNTEER_INFO',
       payload: this.state
     }) 
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Header />
          <VolunteerNav />
        <form onSubmit={this.updateVolunteerInfo}>
        <p>{JSON.stringify(this.state.as_needed)}</p>
          <h1>Edit volunteer Info</h1>
          <FormControl>
            <TextField
              label="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
              className={this.props.classes.text}
            />
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleInputChangeFor('first_name')}
              className={this.props.classes.text}
            />
            <TextField
              label="Middle Name"
              type="text"
              name="middle_name"
              value={this.state.middle_name}
              onChange={this.handleInputChangeFor('middle_name')}
              className={this.props.classes.text}
            />
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputChangeFor('last_name')}
              className={this.props.classes.text}
            />
            <TextField
              label="Primary Phone"
              type="text"
              name="primary_phone"
              value={this.state.primary_phone}
              onChange={this.handleInputChangeFor('primary_phone')}
              className={this.props.classes.text}
            />
            <TextField
              label="Secondary Phone"
              type="text"
              name="secondary_phone"
              value={this.state.secondary_phone}
              onChange={this.handleInputChangeFor('secondary_phone')}
              className={this.props.classes.text}
            />
            <TextField
              label="Street Address 1"
              type="text"
              name="street_address1"
              value={this.state.street_address1}
              onChange={this.handleInputChangeFor('street_address1')}
              className={this.props.classes.text}
            />
            <TextField
              label="Street Address 2"
              type="text"
              name="street_address2"
              value={this.state.street_address2}
              onChange={this.handleInputChangeFor('street_address2')}
              className={this.props.classes.text}
            />
            <TextField
              label="City"
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleInputChangeFor('city')}
              className={this.props.classes.text}
            />
            <TextField
              label="State"
              type="text"
              name="state"
              value={this.state.state}
              onChange={this.handleInputChangeFor('state')}
              className={this.props.classes.text}
            />
            <TextField
              label="Zip Code"
              type="text"
              name="zip"
              value={this.state.zip}
              onChange={this.handleInputChangeFor('zip')}
              className={this.props.classes.text}
            />
            <TextField
              label="Employer"
              type="text"
              name="employer"
              value={this.state.employer}
              onChange={this.handleInputChangeFor('employer')}
              className={this.props.classes.text}
            />
            <TextField
              label="Job Title"
              type="text"
              name="job_title"
              value={this.state.job_title}
              onChange={this.handleInputChangeFor('job_title')}
              className={this.props.classes.text}
            />
            <TextField
              label="Date Of Birth"
              type="date"
              name="date_of_birth"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.date_of_birth}
              onChange={this.handleInputChangeFor('date_of_birth')}
              className={this.props.classes.text}
            />
            <FormLabel>
              Are you interested in volunteering:
              </FormLabel>
          <FormControlLabel control={<Checkbox value={this.state.regular_basis} onChange={this.handleChange('regular_basis')} />} label="On A Regular Basis (once a week, twice a month, etc.) "/>
           <FormControlLabel control={<Checkbox value={this.state.specific_event} onChange={this.handleChange('specific_event')}/>} label= "For One Specific Event (Annual Breakfast, Golf Event, etc.) "/>
            <FormControlLabel control={<Checkbox value={this.state.as_needed} onChange={this.handleChange('as_needed')}/>} label="As needed (for volunteer committees, special events, or responding to requests for volunteers)" />
              <br />
            <FormLabel>
              List any health/physical limitations, including allergies
              </FormLabel>
            <TextField
              type="text"
              name="limitations_allergies"
              className={this.props.classes.text}
              fullWidth
              multiline={true}
              value={this.state.limitations_allergies}
              onChange={this.handleInputChangeFor('limitations_allergies')}
            />
            <br />
            <FormLabel>
              What makes you excited about volunteering Gildas Club Twin Cities?
              </FormLabel>
            <TextField
              type="text"
              name="why_excited"
              fullWidth
              multiline={true}
              value={this.state.why_excited}
              onChange={this.handleInputChangeFor('why_excited')}
              className={this.props.classes.text}
            />
            <br/>
            {/* <Button
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
              </Button> */} 
               <FormLabel className={this.props.classes.formLabel}>
               Notes:
              </FormLabel>
              <textarea
              type="text"
              name="admin_notes"
              fullWidth
              multiline={true}
              value={this.state.admin_notes}
              onChange={this.handleInputChangeFor('admin_notes')}
              className={this.props.classes.textarea}
              // className="textarea"
            ></textarea>
          </FormControl>
          <Button
              type="submit"
              variant="raised"
              color="primary"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={this.returnHome}
              variant="raised"
              color="primary"
            >
              Cancel
              </Button> 
        </form>
        <div className="aside">
          <Chip 
          label="Awesome Chip Component"
          color={this.state.chip.color}
          
          />
        </div>
        </div>
      </React.Fragment>
    )
  }
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(AdminSingleVolunteerView)));