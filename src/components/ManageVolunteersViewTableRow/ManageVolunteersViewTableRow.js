import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableRow, Button } from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons'
import AdminManageVolunteersDialgueTable from '../AdminManageVolunteersDialogueTable/AdminManageVolunteersDialgueTable';
import AdminSingleVolunteerDialog from '../AdminSingleVolunteerDialog/AdminSingleVolunteerDialog'


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class ManageVolunteersViewTableRow extends Component {

    // componentDidMount(){
    //     let volunteer = this.props.volunteer.id
    //     let id = volunteer.id
    //     this.props.dispatch({ type:'GET_ALL_VOLUNTEER_INFO',payload: id})
    // }
    certified = (certificationStatus) => {
        if (certificationStatus) {
            return <CheckCircle nativeColor="green" />
        }
        else { return <Cancel nativeColor="red" /> }
    }

    // editVolunteer = () => {
    //     console.log(this.props.volunteer);
    //     let volunteer = this.props.volunteer
    //     console.log('going to edit volunteer view')
    //     console.log(this.props.volunteer.id)
    //     let id = volunteer.id
    //     // this.props.dispatch({
    //     //    type:'GET_ALL_VOLUNTEER_INFO',
    //     //    payload: volunteer.id
    //     //    })
    //     this.props.history.push(`/admin_single_volunteer_view/${volunteer.id}`)
       
    // }

    render() {

        // let editButton = null;

        // if (this.props.user.access_level === 3) {
        //     editButton = (
        //         <Button onClick={this.editVolunteer}>Edit</Button>
        //     )``
        // }
        // <Card key={index} className={this.props.classes.card} onClick={()=> this.props.history.push(`/question/${question.id}`)}>
        return (
            <TableRow className={this.props.classes.row}>
                <CustomTableCell>{this.props.volunteer.first_name}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.middle_name}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.last_name}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.email}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.primary_phone}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.secondary_phone}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.av_support)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.cash_handling)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.clinic_ambassador)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.communications)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.data_entry)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.gilda_greeter)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.instructor)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.noogieland)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.outreach_ambassador)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.special1)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.special2)}</CustomTableCell>
                <CustomTableCell>{this.certified(this.props.volunteer.special3)}</CustomTableCell>
                <CustomTableCell><AdminSingleVolunteerDialog volunteer={this.props.volunteer}/></CustomTableCell>
            </TableRow>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
});

const connectedManageVolunteersViewTableRow = withRouter(connect(mapStateToProps)(ManageVolunteersViewTableRow));
export default withStyles(styles)(connectedManageVolunteersViewTableRow);