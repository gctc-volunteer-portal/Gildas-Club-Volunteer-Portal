import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import {HighlightOff} from '@material-ui/icons';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,

  },
  table: {
    minWidth: 800,
    

  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
 
});



class CustomizedTable extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type: 'GET_EVENT_VOLUNTEERS',
      payload: this.props.opportunity.id
    })
  }
  handleDelete = (volunteer, opportunity) => { 
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });   
      this.props.dispatch({
        type: 'DELETE_ITEM',
        payload: {
          volunteerId: volunteer,
          opportunityId: opportunity
        }
      })
    
      
  }
      
  render() {
    let currentVolunteers;
    const { classes } = this.props;
    currentVolunteers = this.props.state.opportunitiesReducer.opportunityVolunteerReducer.map((volunteer, index) => {
      
      return (
        <TableRow key={index}>
        <CustomTableCell  style={{textAlign: 'left'}}>{volunteer.first_name}</CustomTableCell>
        <CustomTableCell  style={{textAlign: 'left'}}>{volunteer.last_name}</CustomTableCell>
        <CustomTableCell  style={{textAlign: 'left'}}>{volunteer.email}</CustomTableCell>
        <CustomTableCell  style={{textAlign: 'left'}}>{volunteer.primary_phone}</CustomTableCell>
        <CustomTableCell><Button size="small" variant="contained" color="primary" className={classes.button} onClick={()=>this.handleDelete(volunteer.user_id, this.props.opportunity.id)}>
        <HighlightOff className={classes.rightIcon} />
        </Button></CustomTableCell>
         </TableRow>
      )
})
  
  
    return (
      <Paper style={{ height: 350, margin: 50, overflow: 'scroll'}} className={classes.root}>
        <Table className={classes.table} >
          <TableHead>
            <TableRow>
              <CustomTableCell>First Name</CustomTableCell>
              <CustomTableCell>Last Name</CustomTableCell>
              <CustomTableCell>Email</CustomTableCell>
              <CustomTableCell>Primary Phone</CustomTableCell>
              <CustomTableCell>Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
                {currentVolunteers}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  state
});

export default connect(mapStateToProps)(withStyles(styles)(CustomizedTable));