import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';


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


    render() {
        console.log(this.props);


        let tableRow = (
            <TableRow className={this.props.classes.row}>
                <CustomTableCell>{this.props.volunteer.first_name}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.middle_name}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.last_name}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.email}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.primary_phone}</CustomTableCell>
                <CustomTableCell>{this.props.volunteer.secondary_phone}</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
                <CustomTableCell>yes</CustomTableCell>
            </TableRow>
        )

        if (this.props.user.access_level === 3) {
            tableRow = (
                <TableRow className={this.props.classes.row}>
                    <CustomTableCell>{this.props.volunteer.first_name}</CustomTableCell>
                    <CustomTableCell>{this.props.volunteer.middle_name}</CustomTableCell>
                    <CustomTableCell>{this.props.volunteer.last_name}</CustomTableCell>
                    <CustomTableCell>{this.props.volunteer.email}</CustomTableCell>
                    <CustomTableCell>{this.props.volunteer.primary_phone}</CustomTableCell>
                    <CustomTableCell>{this.props.volunteer.secondary_phone}</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>yes</CustomTableCell>
                    <CustomTableCell>Edit</CustomTableCell>
                </TableRow>
            )
        }

        return (
            <React.Fragment>
                {tableRow}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const connectedManageVolunteersViewTableRow = connect(mapStateToProps)(ManageVolunteersViewTableRow);
export default withStyles(styles)(connectedManageVolunteersViewTableRow);