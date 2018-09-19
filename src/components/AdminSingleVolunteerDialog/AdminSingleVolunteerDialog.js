import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, FormControl, FormControlLabel, FormLabel, Chip, Checkbox, TextField, Button, Dialog, Slide, Switch } from '@material-ui/core';
import '../AdminSingleVolunteerDialog/AdminSingleVolunteer.css';


const mapStateToProps = state =>({
   currentVolunteer: state.indVolunteerInfo.indVolunteerInfo,
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
    },
    indChip:{
      marginBottom:'5px',
      width:'250px',
      testAlign:'center'
      // color: ' #DE2027'
      
    },
    thisOneChip:{
      // backgroundColor:'#DE2027'
    },
    chip:{
      position: 'absolute',
      marginTop: '10px',
      marginBottom:'px',
      width: '220px',
      height: '440px',
      // margin: '60%  ',
      padding: '30px',
      borderRadius: '10px',
      float: 'right',
      bottom: '-300px',
      right: '50px',
      left:' 650px',
      // marginRight:'40%',
      // marginTop:'13px',
      border: '2px solid red',
      verticalAlign:'center',
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
    },
    cert:{
     textAlign: 'center',
     position: 'absolute',
     top:'-60px',
    //  right: '-10px'
     
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
        this.state = {
          // email: this.props.volunteer.email,
          email: '',
          dynamics_id: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          primary_phone: '',
          secondary_phone: '',
          street_address1: '',
          street_address2: '',
          city: '',
          state: '',
          zip: '',
          regular_basis: '',
          specific_event: '',
          as_needed: '',
          limitations_allergies: '',
          why_excited: '',
          employer: '',
          job_title: '',
          date_of_birth: '',
          active: '',
          access_level: '',
          admin_notes: '',
          message: '',
          open: false,
          certs:{
          aVsupport: {},

          cash_handling: {},

          clinic_ambassador: {},

          communications: {},

          data_entry: {},

          gilda_greeter: {},

          instructor: {},

          noogieland: {},

          outreach_ambassador: {},

          special_one: {},

          special_two: {},

          special_three: {},

          open_to_all: {}
          },
          chip:{
           color:'primary',
            onDelete: 'none',
            avatar: 'none',
            variant: 'default',
          }
        }
      }
 
 
  
  componentDidMount() {
    this.props.dispatch({ type: 'GET_CERTIFICATIONS_LIST' });
    this.props.dispatch({ type: 'FETCH_VOLUNTEER_INFO'})
  }


//open dialog
handleClickOpen = () => {
  this.setState({
    email: this.props.volunteer.email,
    dynamics_id: this.props.volunteer.dynamics_id,
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
    open: true,
    certs:{
    aVsupport: {id:1 ,certified: this.props.volunteer.av_support},

    cash_handling: {id: 2,certified: this.props.volunteer.cash_handling},

    clinic_ambassador: {id: 3, certified: this.props.volunteer.clinic_ambassador },

    communications: {id: 4,certified: this.props.volunteer.communications},

    data_entry: {id: 5,certified: this.props.volunteer.data_entry},

    gilda_greeter: {id: 6,certified: this.props.volunteer.gilda_greeter},

    instructor: {id: 7,certified: this.props.volunteer.instructor},

    noogieland: {id: 8,certified: this.props.volunteer.noogieland},

    outreach_ambassador: {id: 9,certified: this.props.volunteer.outreach_ambassador},

    special_one: {id: 10 ,certified: this.props.volunteer.special1},

    special_two: {id: 11,certified: this.props.volunteer.special2},

    special_three: {id: 12,certified: this.props.volunteer.special3},

    open_to_all: { id: 13, certified: this.props.volunteer.open_to_all}
    }
  });
};

//close diaglog
handleClose = () => {
  this.setState({ open: false });
  this.props.dispatch({ type: 'FETCH_VOLUNTEER_INFO'})
  // this.props.dispatch({type: 'SET_VOLUNTEER_INFO'})
};

//getting volunteer information 
  getAllVolunteerInfo = (state) =>{
    let id = this.props.volunteer.id
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
  //for check boxes on volunteer edit feature
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  //update for entire dialog page
  updateVolunteerInfo = (event) => {
    event.preventDefault()
    let volunteerId = this.props.volunteer.id
    let state = this.state
    this.props.dispatch({
       type:'UPDATE_VOLUNTEER_INFO',
       payload:{
        volunteerId, state
       } 
     });
     
     this.updateCertification()
 
    this.handleClose()
  } 
  
  updateCertification = (event) => {
    let id = this.props.volunteer.id
    let certs = this.state.certs
    this.props.dispatch({type: 'UPDATE_CERTIFICATIONS',
    payload:{
      certs,id
    }
  })
 }

  handleNoogieLandCert = (property) => {
  this.setState({
      ...this.state,
      certs: {
        ...this.state.certs, 
      [property]:{
        ...this.state.certs[property],
          certified: !this.state.certs[property].certified
        }
      }
    })
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
    let toggleAccess;
    if(this.state.access_level === 2){
      toggleAccess = (<div>
        <FormControlLabel control={
        <Switch 
            checked={true}
            onChange={this.editAccess}
            value="access_level"
            color="primary"
           />}  label="Manager Capabilities on"
           />
      </div>)
    } else if (this.state.access_level === 1){
      toggleAccess = (<div>
        <FormControlLabel control={ <Switch 
            checked={false}
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
         color="primary"
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
  


    /////////////////////////////////////
    
    
    
    let noogieLand
    if(this.state.certs.noogieland.certified){noogieLand= 'primary'}else{noogieLand='default'}

    let avSupport
    if(this.state.certs.aVsupport.certified){avSupport= 'primary'}else{avSupport='default'}

    let cashHandling
    if(this.state.certs.cash_handling.certified){cashHandling= 'primary'}else{cashHandling='default'}

    let clinicAmbassador
    if(this.state.certs.clinic_ambassador.certified){clinicAmbassador= 'primary'}else{clinicAmbassador='default'}

    let communications
    if(this.state.certs.communications.certified){communications= 'primary'}else{communications='default'}

    let dataEntry
    if(this.state.certs.data_entry.certified){dataEntry= 'primary'}else{dataEntry='default'}

    let gildaGreeter
    if(this.state.certs.gilda_greeter.certified){gildaGreeter= 'primary'}else{gildaGreeter='default'}

    let instructor
    if(this.state.certs.instructor.certified){instructor= 'primary'}else{instructor='default'}

    let outreachAmassador
    if(this.state.certs.outreach_ambassador.certified){outreachAmassador= 'primary'}else{outreachAmassador='default'}

    let specialOne
    if(this.state.certs.special_one.certified){specialOne= 'primary'}else{specialOne='default'}

    let specialTwo
    if(this.state.certs.special_two.certified){specialTwo= 'primary'}else{specialTwo='default'}

    let specialThree
    if(this.state.certs.special_three.certified){specialThree= 'primary'}else{specialThree='default'}

    return (
      <React.Fragment>
        <Button onClick={this.handleClickOpen}>Edit</Button>
        <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
        <div>
        <form onSubmit={this.updateVolunteerInfo}>
          <h1>Edit volunteer Info</h1>
          <FormControl>
            <TextField  
              label= "Dynamics id"
              type="text"
              name="Dynamics id"
              value={this.state.dynamics_id}
              placeholder={this.props.currentVolunteer.dynamics_id}
              onChange={this.handleInputChangeFor('dynamics_id')}
              className={this.props.classes.text}
            />
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
              
          <FormControlLabel control={<Checkbox value={this.props.currentVolunteer.regular_basis} 
          checked={this.state.regular_basis}
                           onChange={this.handleChange('regular_basis')} />} 
                            label="On A Regular Basis (once a week, twice a month, etc.) "
                            />

           <FormControlLabel control={<Checkbox value={this.props.currentVolunteer.specific_event} 
                       checked={this.state.specific_event}
                             onChange={this.handleChange('specific_event')}/>} 
                             label= "For One Specific Event (Annual Breakfast, Golf Event, etc.)"
                              />

            <FormControlLabel control={<Checkbox value={this.props.currentVolunteer.as_needed} 
            checked={this.state.as_needed}
onChange={this.handleChange('as_needed')}/>} 
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
          
               <FormLabel className={this.props.classes.formLabel}>
               Notes:
              </FormLabel>
              <textarea
              type="text"
              name="admin notes"
              // fullWidth={true}
              // multiline="true"
              value={this.state.admin_notes}
              onChange={this.handleInputChangeFor('admin_notes')}
              className={this.props.classes.textarea}>
              </textarea>
          </FormControl>
          <Button
              type="submit"
              variant="raised"
              color="primary"
              style={{margin: 10}}
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={this.handleClose}
              variant="raised"
              color="primary"
              style={{margin: 10}}

            >
              Cancel
              </Button> 
        </form> 
      
        

        <section className={this.props.classes.chip}>
                <h2 className={this.props.classes.cert}>Certifications</h2>
          <FormControlLabel control={<Chip  
          label="Noogieland"
          className={this.props.classes.indChip}
          checked={this.state.certs.noogieland.certified}clickable
          color={noogieLand} value="noogieland" 
          onClick={()=>this.handleNoogieLandCert('noogieland')} 
          id="noogieland" />}/>
          <br />

           <FormControlLabel control={<Chip  
          label="A/V Support"
          className={this.props.classes.indChip}
          checked={this.state.certs.aVsupport.certified}clickable
          color={avSupport} value="aVsupport" 
          onClick={()=>this.handleNoogieLandCert('aVsupport')} 
          id="aVsupport" />}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Cash Handling"
          className={this.props.classes.indChip}
          checked={this.state.certs.cash_handling.certified}clickable
          color={cashHandling} value="cash_handling" 
          onClick={()=>this.handleNoogieLandCert('cash_handling')} 
          id="cash_handling" />}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Clinic Ambassador"
          className={this.props.classes.indChip}
          checked={this.state.certs.clinic_ambassador.certified}clickable
          color={clinicAmbassador} value="clinic_ambassador" 
          onClick={()=>this.handleNoogieLandCert('clinic_ambassador')} 
          id="clinic_ambassador" />}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Communications"
          className={this.props.classes.indChip}
          checked={this.state.certs.communications.certified}clickable
          color={communications} value="communications" 
          onClick={()=>this.handleNoogieLandCert('communications')} 
          id="communications" />}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Data Entry"
          className={this.props.classes.indChip}
          checked={this.state.certs.data_entry.certified}clickable
          color={dataEntry} value="data_entry" 
          onClick={()=>this.handleNoogieLandCert('data_entry')} 
          id="data_entry" />}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Gilda Greeter"
          className={this.props.classes.indChip}
          checked={this.state.certs.gilda_greeter.certified}clickable
          color={gildaGreeter} value="gilda_greeter" 
          onClick={()=>this.handleNoogieLandCert('gilda_greeter')} 
          id="gilda_greeter" />}/>
          <br />
    
          <FormControlLabel control={<Chip  
          label="instructor"
          className={this.props.classes.indChip}
          checked={this.state.certs.instructor.certified}clickable
          color={instructor} value="instructor" 
          onClick={()=>this.handleNoogieLandCert('instructor')} 
          id="instructor"/>}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Outreach Ambassador"
          className={this.props.classes.indChip}
          checked={this.state.certs.outreach_ambassador.certified}clickable
          color={outreachAmassador} value="outreach_ambassador" 
          onClick={()=>this.handleNoogieLandCert('outreach_ambassador')} 
          id="outreach_ambassador" />}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Special 1"
          className={this.props.classes.indChip}
          checked={this.state.certs.special_one.certified}clickable
          color={specialOne} value="special_one" 
          onClick={()=>this.handleNoogieLandCert('special_one')} 
          id="special_one" />}/>
          <br />
      
          <FormControlLabel control={<Chip  
          label="Special 2"
          className={this.props.classes.indChip}
          checked={this.state.certs.special_two.certified}clickable
          color={specialTwo} value="special_two" 
          onClick={()=>this.handleNoogieLandCert('special_two')} 
          id="special_Two" />}/>
          <br />

          <FormControlLabel control={<Chip  
          label="Special 3"
          className={this.props.classes.indChip}
          checked={this.state.certs.special_three.certified}clickable
          color={specialThree} value="special_three" 
          onClick={()=>this.handleNoogieLandCert('special_three')} 
          id="special_three" />}/>
          <br />
          <br />
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
