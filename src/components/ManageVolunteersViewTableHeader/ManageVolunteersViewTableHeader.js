import React, { Component } from 'react';
import { TableHead, TableRow, TableCell, Tooltip, TableSortLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './ManageVolunteersViewTableHeader.css';

const styles = theme => ({
    head: {
      backgroundColor: theme.palette.secondary.main,
      top: 0
    }
});

const columns = [
    { id: 'edit', label: '', rotate: false },
    { id: 'first_name', label: 'First Name', rotate: false },
    // { id: 'middle_name', label: 'Middle Name' },
    { id: 'last_name', label: 'Last Name', rotate: false },
    { id: 'email', label: 'Email', rotate: false },
    { id: 'primary_phone', label: 'Primary Phone', rotate: false },
    // { id: 'secondary_phone', label: 'Secondary Phone' },
    { id: 'av_support', label: 'A/V Support', rotate: true },
    { id: 'cash_handling', label: 'Cash Handling', rotate: true },
    { id: 'clinic_ambassador', label: 'Clinic Ambassador', rotate: true },
    { id: 'communications', label: 'Communications', rotate: true },
    { id: 'data_entry', label: 'Data Entry', rotate: true },
    { id: 'gilda_greeter', label: 'Gilda Greeter', rotate: true },
    { id: 'instructor', label: 'Instructor', rotate: true },
    { id: 'noogieland', label: 'Noogieland', rotate: true },
    { id: 'outreach_ambassador', label: 'Outreach Ambassador', rotate: true },
    { id: 'special1', label: 'Special 1', rotate: true },
    { id: 'special2', label: 'Special 2', rotate: true },
    { id: 'special3', label: 'Special 3', rotate: true },
];

class ManageVolunteersViewTableHeader extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { classes } = this.props;
        let columnHeaders = columns.map((column, index) => {
            let applyClass = '';
            if(column.rotate) {
                applyClass = 'rotate'
            }
            return (
                <TableCell class={applyClass}
                    key={index}
                    sortDirection={this.props.orderBy === column.id ? this.props.order : false}
                    className={classes.head}
                >
                    <Tooltip
                        title="Sort"
                        enterDelay={300}
                    >
                        <div>
                                <TableSortLabel
                                    active={this.props.orderBy === column.id}
                                    direction={this.props.order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
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