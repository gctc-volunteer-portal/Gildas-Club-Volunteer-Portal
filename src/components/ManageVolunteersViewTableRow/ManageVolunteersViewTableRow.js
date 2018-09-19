import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons'
import AdminSingleVolunteerDialog from '../AdminSingleVolunteerDialog/AdminSingleVolunteerDialog'

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      
    },
    body: {
        fontSize: 14,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
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

    certified = (certificationStatus) => {
        if (certificationStatus) {
            return <CheckCircle nativeColor="green" />
        }
        else { return <Cancel nativeColor="red" /> }
    }

    render() {


        let editButton = null;

        if (this.props.user.access_level === 3) {
            editButton = (
                <AdminSingleVolunteerDialog volunteer={this.props.volunteer} />
            )
        }
      
        return (
            <TableRow className={this.props.classes.row}>
                <CustomTableCell>{editButton}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.first_name}</CustomTableCell>
                {/* <CustomTableCell>{this.props.volunteer.middle_name}</CustomTableCell> */}
                <CustomTableCell>{this.props.volunteer.last_name}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.email}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.primary_phone}</CustomTableCell>
                {/* <CustomTableCell>{this.props.volunteer.secondary_phone}</CustomTableCell> */}
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