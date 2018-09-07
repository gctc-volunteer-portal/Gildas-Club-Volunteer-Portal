import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import ManageVolunteersViewTableHeader from '../ManageVolunteersViewTableHeader/ManageVolunteersViewTableHeader';
import ManageVolunteersViewTableRow from '../ManageVolunteersViewTableRow/ManageVolunteersViewTableRow';

import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TablePagination, TableRow, Paper } from '@material-ui/core';

let counter = 0;
function createData(firstName, middleName, lastName, email, primaryPhone, secondaryPhone, avSupport, cashHandling, clinicAmbassador, communications, dataEntry, gildaGreeter, instructor, noogieland, outreachAmbassador, special1, special2, special3) {
    counter += 1;
    return { id: firstName, middleName, lastName, email, primaryPhone, secondaryPhone, avSupport, cashHandling, clinicAmbassador, communications, dataEntry, gildaGreeter, instructor, noogieland, outreachAmbassador, special1, special2, special3 };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ManageVolunteersTable extends Component {

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'FETCH_VOLUNTEER_INFO' });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null || this.props.user.access_level === 1) {
            this.props.history.push('home');
        }
    }

    formattedVolunteerInfo = this.props.volunteers.map((volunteer, index) => {
        return (
            createData(
                volunteer.first_name,
                volunteer.middle_name,
                volunteer.last_name,
                volunteer.email,
                volunteer.primary_phone,
                volunteer.secondary_phone,
                volunteer.av_support,
                volunteer.cash_handling,
                volunteer.clinic_ambassador,
                volunteer.communications,
                volunteer.data_entry,
                volunteer.gilda_greeter,
                volunteer.instructor,
                volunteer.noogieland,
                volunteer.outreach_ambassador,
                volunteer.special1,
                volunteer.special2,
                volunteer.special3
            )
        )
    })

    state = {
        order: 'asc',
        orderBy: 'lastName',
        data: this.formattedVolunteerInfo,
        page: 0,
        rowsPerPage: 5,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);

        let mappedVolunteers = this.props.volunteers.map((volunteer, index) => {
            return (
                <ManageVolunteersViewTableRow volunteer={volunteer} key={index} />
            )
        });

        return (
            <Paper className={this.props.classes.root}>
                <div className={this.props.classes.tableWrapper}>
                    <Table className={this.props.classes.table} aria-labelledby="tableTitle">
                        <ManageVolunteersViewTableHeader
                            order={this.state.order}
                            orderBy={this.state.orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.data.length}
                        />
                        <TableBody>
                            {stableSort(this.state.data, getSorting(this.state.order, this.state.orderBy))
                                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                .map((volunteer, index) => {
                                    return (
                                        <ManageVolunteersViewTableRow volunteer={volunteer} key={index} />
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={this.state.data.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    volunteers: state.volunteerInfo,
});

const connectedManageVolunteersTable = connect(mapStateToProps)(ManageVolunteersTable);
export default withStyles(styles)(connectedManageVolunteersTable);