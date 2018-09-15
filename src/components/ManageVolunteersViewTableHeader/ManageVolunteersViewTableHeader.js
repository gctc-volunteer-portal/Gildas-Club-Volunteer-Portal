import React, { Component } from 'react';
import { TableHead, TableRow, TableCell, Tooltip, TableSortLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './ManageVolunteersViewTableHeader.css';

const styles = theme => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        top: 0
    }
});

const columns = [
    { id: 'edit', label: '' },
    { id: 'first_name', label: 'First Name' },
    // { id: 'middle_name', label: 'Middle Name' },
    { id: 'last_name', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'primary_phone', label: 'Primary Phone' },
    // { id: 'secondary_phone', label: 'Secondary Phone' },
    { id: 'av_support', label: 'A/V Support' },
    { id: 'cash_handling', label: 'Cash Handling' },
    { id: 'clinic_ambassador', label: 'Clinic Ambassador' },
    { id: 'communications', label: 'Communications' },
    { id: 'data_entry', label: 'Data Entry' },
    { id: 'gilda_greeter', label: 'Gilda Greeter' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'noogieland', label: 'Noogieland' },
    { id: 'outreach_ambassador', label: 'Outreach Ambassador' },
    { id: 'special1', label: 'Special 1' },
    { id: 'special2', label: 'Special 2' },
    { id: 'special3', label: 'Special 3' },
];

class ManageVolunteersViewTableHeader extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { classes } = this.props;
        let columnHeaders = columns.map((column, index) => {
            return (
                <TableCell class='rotate'
                    key={index}
                    sortDirection={this.props.orderBy === column.id ? this.props.order : false}
                    className={classes.head}
                >
                    <Tooltip
                        title="Sort"
                        enterDelay={300}
                    >
                        <div>
                            <span>
                                <TableSortLabel
                                    active={this.props.orderBy === column.id}
                                    direction={this.props.order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </span>
                        </div>
                    </Tooltip>
                </TableCell>
            );
        })

        return (
            <TableHead>
                <TableRow>
                    {columnHeaders}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles)(ManageVolunteersViewTableHeader);