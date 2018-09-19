import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import AdminNav from '../Nav/AdminNav/AdminNav';
import ManageVolunteersViewTableHeader from '../ManageVolunteersViewTableHeader/ManageVolunteersViewTableHeader';
import ManageVolunteersViewTableRow from '../ManageVolunteersViewTableRow/ManageVolunteersViewTableRow';
import Csv from '../Csv/Csv'

import { USER_ACTIONS } from '../../redux/actions/userActions';

import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TablePagination, TableRow, Paper } from '@material-ui/core';

function desc(a, b, orderBy) {

    // sorts table data
    // if table data is true/false (for certifications), sort type is reversed to ensure true values floats to the top on 
    if ((b[orderBy] === true || b[orderBy] === false) && (a[orderBy] === true || a[orderBy] === false)) {
        if (b[orderBy] < a[orderBy]) {
            return 1;
        }
        else if (b[orderBy] > a[orderBy]) {
            return -1;
        }
        else return 0;
    }
    else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        else if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        else return 0;
    }


}

// maps over the table data to sort to create a new array for sorting without altering the original
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

// sets the sort order as either ascending or descending based on the current sort order
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
    root: {
        width: '98%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },

    tableWrapper: {
        overflowX: 'auto',
    },
});

class ManageVolunteersTable extends Component {

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'FETCH_VOLUNTEER_INFO' });
        this.props.dispatch({ type: 'GET_NEW_VOLUNTEERS'});
        this.props.dispatch({ type: 'GET_ALL_OPPORTUNITY_INFO'});
        this.props.dispatch({type:'GET_CERTIFICATIONS_LIST'})
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && (this.props.user.email === null || this.props.user.access_level < 2)) {
            this.props.history.push('/home');
        }
    }

    // sets default order rules, rows per page, and what page to start the table on
    state = {
        order: 'asc',
        orderBy: 'last_name',
        page: 0,
        rowsPerPage: 50,
    };

    // sets sort order
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'asc';

        if (this.state.orderBy === property && this.state.order === 'asc') {
            order = 'desc';
        }
        this.setState({ order, orderBy });
    };

    // moves table to next page
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    // change number of rows visible on single page
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const data = this.props.volunteers;
        const { order, orderBy, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        
        // conditionally render CSV export links to be only visible to admins
        let csv = null;
        if (this.props.user.access_level === 3){
            csv = (
                <Csv
                    data= {this.props.volunteers}
                    newVolunteers = {this.props.newVolunteers}
                    allOpportunitiesInfo = {this.props.allOpportunitiesInfo}
                />
            )
      }

        return (
            <React.Fragment>
                <Header admin={true} />
                <AdminNav />
               {csv}
                <Paper className={this.props.classes.root}>
                    <div className={this.props.classes.tableWrapper}>
                        <Table>
                            <ManageVolunteersViewTableHeader
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {
                                    stableSort(data, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((volunteer, index) => {
                                            return (
                                                <ManageVolunteersViewTableRow volunteer={volunteer} key={index} />
                                            );
                                        })}
                                {/* creates empty rows for any pages that have fewer than the maximum number of rows to preserve table height */}
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
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[25, 50, 100]}
                        />
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    volunteers: state.volunteerInfo,
    newVolunteers: state.volunteerReducer.newVolunteers,
    allOpportunitiesInfo: state.opportunitiesReducer.allOpportunitiesInfo
});

const connectedManageVolunteersTable = connect(mapStateToProps)(ManageVolunteersTable);
export default withStyles(styles)(connectedManageVolunteersTable);