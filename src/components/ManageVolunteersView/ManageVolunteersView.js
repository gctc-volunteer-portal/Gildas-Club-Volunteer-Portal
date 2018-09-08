import React, { Component } from 'react';
import { connect } from 'react-redux';


import Header from '../Header/Header';
import AdminNav from '../Nav/AdminNav/AdminNav';
import ManageVolunteersViewTableRow from '../ManageVolunteersViewTableRow/ManageVolunteersViewTableRow';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

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

class ManageVolunteersView extends Component {

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'FETCH_VOLUNTEER_INFO' });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null || this.props.user.access_level === 1) {
            this.props.history.push('home');
        }
    }

    render() {

        let mappedVolunteers = this.props.volunteers.map((volunteer, index) =>{
            return (
                <ManageVolunteersViewTableRow volunteer={volunteer} key={index} />
            )
        });

        return (
            <React.Fragment>
                <Header />
                <AdminNav />
                <h1>Volunteers</h1>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>First Name</CustomTableCell>
                                <CustomTableCell>Middle Name</CustomTableCell>
                                <CustomTableCell>Last Name</CustomTableCell>
                                <CustomTableCell>Email</CustomTableCell>
                                <CustomTableCell>Primary Phone</CustomTableCell>
                                <CustomTableCell>Secondary Phone</CustomTableCell>
                                <CustomTableCell>A/V Support</CustomTableCell>
                                <CustomTableCell>Cash Handling</CustomTableCell>
                                <CustomTableCell>Clinic Ambassador</CustomTableCell>
                                <CustomTableCell>Communications</CustomTableCell>
                                <CustomTableCell>Data Entry</CustomTableCell>
                                <CustomTableCell>Gilda Greeter</CustomTableCell>
                                <CustomTableCell>Instructor</CustomTableCell>
                                <CustomTableCell>Noogieland</CustomTableCell>
                                <CustomTableCell>Outreach Ambassador</CustomTableCell>
                                <CustomTableCell>Special 1</CustomTableCell>
                                <CustomTableCell>Special 2</CustomTableCell>
                                <CustomTableCell>Special 3</CustomTableCell>
                                <CustomTableCell></CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mappedVolunteers}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    volunteers: state.volunteerInfo,
});

const connectedManageVolunteersView = connect(mapStateToProps)(ManageVolunteersView)
export default withStyles(styles)(connectedManageVolunteersView);