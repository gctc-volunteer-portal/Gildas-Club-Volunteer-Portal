import React, { Component } from 'react';

import Header from '../Header/Header';
import VolunteerNav from '../Nav/VolunteerNav/VolunteerNav';

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
    render() {
        return (
            <React.Fragment>
                <Header />
                <VolunteerNav />
                <h1>Volunteers</h1>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Dessert (100g serving)</CustomTableCell>
                                <CustomTableCell numeric>Calories</CustomTableCell>
                                <CustomTableCell numeric>Fat (g)</CustomTableCell>
                                <CustomTableCell numeric>Carbs (g)</CustomTableCell>
                                <CustomTableCell numeric>Protein (g)</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map(row => { */}
                                {/* return ( */}
                                    <TableRow className={this.props.classes.row}>
                                        <CustomTableCell component="th" scope="row">
                                            row.name
                                        </CustomTableCell>
                                        <CustomTableCell numeric>calories</CustomTableCell>
                                        <CustomTableCell numeric>row.fat</CustomTableCell>
                                        <CustomTableCell numeric>row.carbs</CustomTableCell>
                                        <CustomTableCell numeric>row.protein</CustomTableCell>
                                    </TableRow>
                                {/* ); */}
                            {/* })} */}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ManageVolunteersView);