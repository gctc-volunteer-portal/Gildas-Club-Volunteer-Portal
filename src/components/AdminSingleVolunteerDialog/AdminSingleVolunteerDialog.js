import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router';
import Header from '../Header/Header'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { withStyles, FormControl, Input, Avatar ,FormLabel,Chip, Checkbox, NativeSelect, TextField, Button, Dialog, ListItem, ListItemText, List, Divder, AppBar, Typography, closeIcon, Slide, Switch } from '@material-ui/core';
import '../AdminSingleVolunteerDialog/AdminSingleVolunteer.css'
import VolunteerNav from '../Nav/VolunteerNav/VolunteerNav';
import { Z_DEFAULT_COMPRESSION } from 'zlib';

const mapStateToProps = state =>({
   currentVolunteer: state.indVolunteerInfo.indVolunteerInfo
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
    },
    indChip:{
      marginBottom:'10px',
      // color: ' #DE2027'
      
    },
    thisOneChip:{
      // backgroundColor:'#DE2027'
    },
    chip:{
      marginBottom:'10px',
      width: '-30%',
      height: '480px',
      margin: '20%  right',
      padding: '30px',
      borderRadius: '10px',
      float: 'right',
      // marginBottom: '10px',
      marginLeft:'-150px',
      border: '2px solid red',
      verticalAlign:'center'
    },
    switch:{
      marginBottom:'10px',
      width: '30%',
      height: '480px',
      margin: '50%  right',
      marginLeft:'-50px',
      padding: '30px',
      borderRadius: '20px',
      float: 'right',
      position: 'absolute'
    }
    
      
    // width: 30%;
    // height: 250px;
    // margin: 20px left;
    // padding: 30px;
    // border-radius: 2px;
    // position: absolute;
    
  }
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
  

class AdminSingleVolunteerDialog extends Component {
    constructor(props) {
        super(props);
    console.log("this is in the constructor",this.props.currentVolunteer)
        this.state = {
          email: this.props.volunteer.email,
          first_name: this.props.volunteer.first_name,
          middle_name: this.props.volunteer.middle_name,
          last_name: this.props.volunteer.last_name,
          primary_phone: this.props.volunteer.primary_phone,
          secondary_phone: this.props.volunteer.secondary_phone,
          street_address1: this.props.volunteer.street_address1,
          street_address2: this.props.volunteer.street_address2,
          city: this.props.volunteer.city,
          state: this.props.volunteer.state,
          zip: this.props.volunteer.zip,
          regular_basis: this.props.volunteer.regular_basis,
          specific_event: this.props.volunteer.specific_event,
          as_needed: this.props.volunteer.as_needed,
          limitations_allergies: this.props.volunteer.limitations_allergies,
          why_excited: this.props.volunteer.why_excited,
          employer: this.props.volunteer.employer,
          job_title: this.props.volunteer.job_title,
          date_of_birth: this.props.volunteer.date_of_birth,
          active: this.props.volunteer.active,
          access_level: this.props.volunteer.access_level,
          admin_notes: this.props.volunteer.admin_notes,
          message: this.props.volunteer.message,
          open: false,
          noogieland: this.props.noogieland,
          chip:{
           color:'primary',
            onDelete: 'none',
            avatar: 'none',
            variant: 'default',
          }
        }
      }
  // returnHome = () => {
  //   this.props.history.push('/')
  // }
 
  




handleClickOpen = () => {
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false });
};

  getAllVolunteerInfo = (state) =>{
    // let email = this.props.state.indVolunteerInfo.indVolunteerInfo[0]
    // console.log(email)
    let id = this.props.volunteer.id
  console.log(id);
  this.props.dispatch({
    type:'GET_ALL_VOLUNTEER_INFO',
    payload: id
  })
    this.props.history.push('/manage_volunteer')
  }

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
    let id = this.props.volunteer.id
    let state = this.state
    this.props.dispatch({
       type:'UPDATE_VOLUNTEER_INFO',
       payload:{
        id, state
       } 
     });


 
    this.handleClose()
  } 
 
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  }

  handleNuggieLand = () => {
    if(this.state.noogieland === true){
      this.setState({
        noogieland: false
      })
    }else{
      this.setState({
        noogieland:true
    });
  }
    
  }
    
  





 editActive = () => {
   if(this.state.active){
     this.setState({
       active: false
     })
   }else {
     this.setState({
       active: true
     })
   }
 }
  


  editAccess = () => {
    if (this.state.access_level === 1){
    this.setState({
      access_level: 2
    });
  } 
  else {
    this.setState({
      access_level: 1
    });
  }
    
    
  }
 

  render() {
    console.log(this.state.noogieland);
    
    // console.log(this.props.currentVolunteer)
    let toggleAccess;
    if(this.state.access_level == 2){
      toggleAccess = (<div>
        <FormControlLabel control={ <Switch 
            checked={true}
            // onClick={this.editAccess}
            onChange={this.editAccess}
            value="access_level"
           />}  label="Manager Capabilities on"
           />
      </div>)
    } else if (this.state.access_level == 1){
      toggleAccess = (<div>
        <FormControlLabel control={ <Switch 
            checked={false}
            // onClick={this.editAccess}
            onChange={this.editAccess}
            value="access_level"
           />}  label="Manager Capabilities off"
           />
      </div>)
    }

    let active 
    if(this.state.active){
      active = (<div> 
         <FormControlLabel 
         control={ <Switch 
         checked={true}
         onChange={this.editActive}
       />} label="Active"
       /></div>)
    }else{
      active = (<div> 
        <FormControlLabel 
        control={ <Switch 
        checked={false}
        onChange={this.editActive}
      />} 
      label="Inactive" />
      </div>)
    }

    let myColor 
    if(this.state.noogieland === true){
      myColor= (<div>
        <Chip  
          
          // className={this.props.classes.thisOneChip} 
          label="Awesome Chip Component"
          clickable
          color= "primary"
          onClick={this.handleNuggieLand}
          // onChange={this.handleChange('color')}
          />
      </div>)
    }else{
      myColor =( <div>
      <Chip  
          // className={this.props.classes.thisOneChip} 
          label="Awesome Chip Component"
          clickable
          color='default'
          onClick={this.handleNuggieLand}
          // onChange={this.handleChange('color')}
          />
      </div>)
    }
   
    return (
      <React.Fragment>
        <Button onClick={this.handleClickOpen}>edit</Button>
        <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
        <div>
          {/* <Header />
          <VolunteerNav /> */}
        
        <form onSubmit={this.updateVolunteerInfo}>
        
        
        <p>{JSON.stringify(this.state.noogieland)}</p>
        <p>{JSON.stringify(this.state.chip.color)}</p> 

          <h1>Edit volunteer Info</h1>
          <FormControl>
          {/* <Chip  
          
          // className={this.props.classes.thisOneChip} 
          label="Awesome Chip Component"
          color={this.state.chip.color}
          onClick={this.handleColor}
          // onChange={this.handleChange('color')}
          /> */}
          {myColor}
          
            <TextField
              label= "email"
              type="text"
              name="email"
              value={this.state.email}
              placeholder={this.props.currentVolunteer.email}
              onChange={this.handleInputChangeFor('email')}
              className={this.props.classes.text}
            />
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={this.state.first_name}
              placeholder={this.props.currentVolunteer.first_name}
              onChange={this.handleInputChangeFor('first_name')}
              className={this.props.classes.text}
            />
            <TextField
              label="Middle Name"
              type="text"
              name="middle_name"
              value={this.state.middle_name}
              placeholder={this.props.currentVolunteer.middle_name}
              onChange={this.handleInputChangeFor('middle_name')}
              className={this.props.classes.text}
            />
             <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={this.state.last_name}
              placeholder={this.props.currentVolunteer.last_name}
              onChange={this.handleInputChangeFor('last_name')}
              className={this.props.classes.text}
            />
            <TextField
              label="Primary Phone"
              type="text"
              name="primary_phone"
              value={this.state.primary_phone}
              placeholder={this.props.currentVolunteer.primary_phone}
              onChange={this.handleInputChangeFor('primary_phone')}
              className={this.props.classes.text}
            />
            <TextField
              label="Secondary Phone"
              type="text"
              name="secondary_phone"
              value={this.state.secondary_phone}
              placeholder={this.props.currentVolunteer.secondary_phone}
              onChange={this.handleInputChangeFor('secondary_phone')}
              className={this.props.classes.text}
            /> 
            <TextField
              label="Street Address 1"
              type="text"
              name="street_address1"
              value={this.state.street_address1}
              placeholder={this.props.currentVolunteer.street_address1}
              onChange={this.handleInputChangeFor('street_address1')}
              className={this.props.classes.text}
            />
            <TextField
              label="Street Address 2"
              type="text"
              name="street_address2"
              value={this.state.street_address2}
              placeholder={this.props.currentVolunteer.street_address2}
              onChange={this.handleInputChangeFor('street_address2')}
              className={this.props.classes.text}
            />
            <TextField
              label="City"
              type="text"
              name="city"
              value={this.state.city}
              placeholder={this.props.currentVolunteer.city}
              onChange={this.handleInputChangeFor('city')}
              className={this.props.classes.text}
            />
            <TextField
              label="State"
              type="text"
              name="state"
              value={this.state.state}
              placeholder={this.props.currentVolunteer.state}
              onChange={this.handleInputChangeFor('state')}
              className={this.props.classes.text}
            />
            <TextField
              label="Zip Code"
              type="text"
              name="zip"
              value={this.state.zip}
              placeholder={this.props.currentVolunteer.zip}
              onChange={this.handleInputChangeFor('zip')}
              className={this.props.classes.text}
            />
            <TextField
              label="Employer"
              type="text"
              name="employer"
              value={this.state.employer}
              placeholder={this.props.currentVolunteer.employer}
              onChange={this.handleInputChangeFor('employer')}
              className={this.props.classes.text}
            />
            <TextField
              label="Job Title"
              type="text"
              name="job_title"
              value={this.state.job_title}
              placeholder={this.props.currentVolunteer.job_title}
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
              placeholder={this.props.currentVolunteer.date_of_birth}
              onChange={this.handleInputChangeFor('date_of_birth')}
              className={this.props.classes.text}
            />
             <FormLabel>
              Are you interested in volunteering:
              </FormLabel>
              <p>{JSON.stringify(this.state.as_needed)}</p>
          <FormControlLabel control={<Checkbox value={this.props.currentVolunteer.regular_basis} 
          checked={this.state.regular_basis}
                            placeholder={this.state.regular_basis} onChange={this.handleChange('regular_basis')} />} 
                            label="On A Regular Basis (once a week, twice a month, etc.) "
                            />

           <FormControlLabel control={<Checkbox value={this.props.currentVolunteer.specific_event} 
                       checked={this.state.specific_event}
                             placeholder={this.state.specific_event} onChange={this.handleChange('specific_event')}/>} 
                             label= "For One Specific Event (Annual Breakfast, Golf Event, etc.) "
                              />

            <FormControlLabel control={<Checkbox value={this.props.currentVolunteer.as_needed} 
            checked={this.state.as_needed}
            placeholder={this.state.as_needed} onChange={this.handleChange('as_needed')}/>} 
            label="As needed (for volunteer committees, special events, or responding to requests for volunteers)" />

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
              placeholder={this.props.currentVolunteer.limitations_allergies}
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
               {/* <FormLabel className={this.props.classes.formLabel}>
               Notes:
              </FormLabel>
              <textarea
              type="text"
              name="admin_notes"
              fullWidth
              multiline={true}
              value={adminNotes}
              onChange={this.handleInputChangeFor('admin_notes')}
              className={this.props.classes.textarea}
              // className="textarea"
            ></textarea> */}
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
              onClick={this.handleClose}
              variant="raised"
              color="primary"
            >
              Cancel
              </Button> 
        </form> 
        <br/>
        <br />
        <br />

        <section className="aside" className={this.props.classes.chip}>
          <div>
          <Chip  
          className={this.props.classes.indChip}
          clickable={true}
          label="Awesome Chip Component"
          
          />
          <br />
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          />
           <br />
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          />
          <br />
           <Chip
          className={this.props.classes.indChip} 
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          />
          <br />
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          />
             <br />
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          />
             <br />
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          /> 
          <br />
    
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          /> 
          <br />
       
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          /> 
          <br />
         
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          /> 
          <br />
      
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          /> 
          <br />
         
           <Chip 
          className={this.props.classes.indChip}
          label="Awesome Chip Component"
          color={this.state.chip.color} 
          /> 
          <br />
          </div>
            
          <div className={this.props.classes.switch}>
          {toggleAccess}
           
               
           {active}
           </div>
           </section>
         

         
       
        </div>
        </Dialog>
      </React.Fragment>
    )
  }
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(AdminSingleVolunteerDialog)));
