// import React, { Component } from 'react';
// import { connect } from 'react-redux';


// import Header from '../Header/Header';
// import VolunteerNav from '../Nav/VolunteerNav/VolunteerNav';
// import ManageVolunteersViewTableRow from '../ManageVolunteersViewTableRow/ManageVolunteersViewTableRow';

// import { USER_ACTIONS } from '../../redux/actions/userActions';

// import { withStyles } from '@material-ui/core/styles';
// import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

// const CustomTableCell = withStyles(theme => ({
//     head: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     body: {
//         fontSize: 14,
//     },
// }))(TableCell);

// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//     },
//     table: {
//         minWidth: 700,
//     },
//     row: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.background.default,
//         },
//     },
// });

// class ManageVolunteersView extends Component {

//     componentDidMount() {
//         this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
//         this.props.dispatch({ type: 'FETCH_VOLUNTEER_INFO' });
//     }

//     componentDidUpdate() {
//         if (!this.props.user.isLoading && this.props.user.email === null || this.props.user.access_level === 1) {
//             this.props.history.push('home');
//         }
//     }

//     render() {

//         let mappedVolunteers = this.props.volunteers.map((volunteer, index) => {
//             return (
//                 <ManageVolunteersViewTableRow volunteer={volunteer} key={index} />
//             )
//         });

//         return (
//             <React.Fragment>
//                 <Header />
//                 <VolunteerNav />
//                 <h1>Volunteers</h1>
//                 <Paper className={this.props.classes.root}>
//                     <Table className={this.props.classes.table}>
//                         <TableHead>
//                             <TableRow>
//                                 <CustomTableCell>First Name</CustomTableCell>
//                                 <CustomTableCell>Middle Name</CustomTableCell>
//                                 <CustomTableCell>Last Name</CustomTableCell>
//                                 <CustomTableCell>Email</CustomTableCell>
//                                 <CustomTableCell>Primary Phone</CustomTableCell>
//                                 <CustomTableCell>Secondary Phone</CustomTableCell>
//                                 <CustomTableCell>A/V Support</CustomTableCell>
//                                 <CustomTableCell>Cash Handling</CustomTableCell>
//                                 <CustomTableCell>Clinic Ambassador</CustomTableCell>
//                                 <CustomTableCell>Communications</CustomTableCell>
//                                 <CustomTableCell>Data Entry</CustomTableCell>
//                                 <CustomTableCell>Gilda Greeter</CustomTableCell>
//                                 <CustomTableCell>Instructor</CustomTableCell>
//                                 <CustomTableCell>Noogieland</CustomTableCell>
//                                 <CustomTableCell>Outreach Ambassador</CustomTableCell>
//                                 <CustomTableCell>Special 1</CustomTableCell>
//                                 <CustomTableCell>Special 2</CustomTableCell>
//                                 <CustomTableCell>Special 3</CustomTableCell>
//                                 <CustomTableCell></CustomTableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {mappedVolunteers}
//                         </TableBody>
//                     </Table>
//                 </Paper>
//             </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     user: state.user,
//     volunteers: state.volunteerInfo,
// });

// const connectedManageVolunteersView = connect(mapStateToProps)(ManageVolunteersView)
// export default withStyles(styles)(connectedManageVolunteersView);



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Header from '../Header/Header';
import AdminNav from '../Nav/AdminNav/AdminNav';
import ManageVolunteersViewTableHeader from '../ManageVolunteersViewTableHeader/ManageVolunteersViewTableHeader';
import ManageVolunteersViewTableRow from '../ManageVolunteersViewTableRow/ManageVolunteersViewTableRow';

import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TablePagination, TableRow, Paper } from '@material-ui/core';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return 1;
    }
    if (b[orderBy] > a[orderBy]) {
        return -1;
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



    state = {
        order: 'asc',
        orderBy: 'last_name',
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

        const data = this.props.volunteers;
        const { order, orderBy, rowsPerPage, page } = this.state; 
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        console.log(this.state)
        console.log(stableSort(data, getSorting(order, orderBy)))

        return (
            <React.Fragment>
                <Header />
                <AdminNav />
                <Paper className={this.props.classes.root}>
                    <div className={this.props.classes.tableWrapper}>
                        <Table className={this.props.classes.table} aria-labelledby="tableTitle">
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    volunteers: state.volunteerInfo,
});

const connectedManageVolunteersTable = connect(mapStateToProps)(ManageVolunteersTable);
export default withStyles(styles)(connectedManageVolunteersTable);