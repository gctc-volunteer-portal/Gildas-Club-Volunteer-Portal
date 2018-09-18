import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles, Card, CardMedia, CardContent,
    CardActions, Button, Dialog, DialogContent, DialogTitle, Typography
} from '@material-ui/core/';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux'
import AdminManageVolunteersDialogue from '../AdminManageVolunteersDialogue/AdminManageVolunteersDialogue';
import EditOpportunityForm from '../EditOpportunityForm/EditOpportunityForm';
import CardHeader from '@material-ui/core/CardHeader';
import VolunteerOpportunityDialog from '../VolunteerViews/VolunteerOpportunityDialog/VolunteerOpportunityDialog';
import moment from 'moment';
import OpportunityAdminNoteDialogue from '../OpportunityAdminNoteDialogue/OpportunityAdminNoteDialogue';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({

    card: {
        // width: '90%',
        position: 'relative',
        minHeight: 350,
        margin: 50,
        display: 'grid',
        gridTemplateColumns: '374px 1fr 1fr',
    },
    media: {
        height: 350,
        width: 350,
    },
    dialog: {
        textAlign: 'center',
        height: '100vh',
    },
    typography: {
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 15,
        fontStyle: 'normal',
    },
    actions: {
        display: 'flex',
        gridColumnStart: 3,
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
    detail: {
        gridColumnStart: 2,
    },
    button: {
        margin: 5,
        display: 'flex',
    },
    buttonGroup: {
        display: 'inline-flex',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 100,
    },
});

class MediaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminNoteIsOpen: false,
            editEventIsOpen: false,
            opportunityToUpdate: {},
            opportunityId: '',
            status: ''
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_EVENT_VOLUNTEERS', payload: this.props.opportunity.id });
    }

    openEditOpportunity = (opportunityId, opportunityToUpdate) => {
        this.setState({
            editEventIsOpen: true,
            opportunityId: opportunityId,
            opportunityToUpdate: opportunityToUpdate,
        })
    }


    closeEditOpportunity = () => {
        this.setState({
            editEventIsOpen: false,
        });
    };
    handleChange = event => {
        this.setState({ status: event.target.value });
        this.props.dispatch({
            type: 'UPDATE_STATUS',
            payload: {
                opportunityId: this.props.opportunity.id,
                status: event.target.value,

            }
        })
    };

    render() {
        console.log(this.props.certificates);
        
        const { classes } = this.props;
        let neededVolunteers = this.props.opportunity.max_volunteers - this.props.opportunity.number_of_volunteers;
        let buttons;
        let status;
        let statusButton;
        if (this.props.opportunity.status == 1) {
            status = 'Staging'
        } else if (this.props.opportunity.status == 2) {
            status = 'Active'
        } else {
            status = 'Inactive'
        }
        if (this.props.state.user.access_level >= 2 && this.props.admin) {
            statusButton = (
                <div>
                    <Typography className={classes.typography} style={{ textAlign: 'right' }}>
                        {status}
                    </Typography>
                    <FormControl className={classes.formControl} fullWidth={true}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                            Change Status
                        </InputLabel>
                        <Select
                            value={this.state.status}
                            onChange={this.handleChange}
                            input={<Input name="age" id="age-label-placeholder" />}
                            displayEmpty
                            name="age"
                            className={classes.selectEmpty}
                        >
                            <MenuItem value={1}>Staging</MenuItem>
                            <MenuItem value={2}>Active</MenuItem>
                            <MenuItem value={3}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            )

            buttons = (
                <div>
                    <Typography className={classes.typography} style={{ textAlign: 'right' }}>
                        Need {neededVolunteers} of {this.props.opportunity.max_volunteers} volunteers
                    </Typography>
                    <div className={classes.buttonGroup}>
                        <AdminManageVolunteersDialogue
                            opportunity={this.props.opportunity}
                        />
                        <Button
                            className={classes.button}
                            color="primary"
                            variant="raised"
                            size="small"
                            onClick={() => this.openEditOpportunity(this.props.opportunity.id, this.props.opportunity)}
                        >
                            Edit Opportunity
                        </Button>
                        <OpportunityAdminNoteDialogue
                            opportunityId={this.props.opportunity.id}
                            opportunityNote={this.props.opportunity.private_notes}
                        />
                    </div>
                </div>
            )
        } else {
            buttons = (
                <div>
                    <Typography className={classes.typography} style={{ textAlign: 'right' }}>
                        Need {neededVolunteers} of {this.props.opportunity.max_volunteers} volunteers
                    </Typography>
                    <div>
                        <VolunteerOpportunityDialog className={classes.buttonGroup} opportunity={this.props.opportunity} />
                    </div>
                </div>

            )
        }

        return (
            <React.Fragment>
                <Card className={classes.card}>
                    <CardContent>
                        <CardMedia
                            className={classes.media}
                            image={this.props.opportunity.upload_image}
                            height="350"
                            width="350"
                            title="Opportunity"
                        />
                    </CardContent>
                    <CardContent className={classes.detail}>
                        <CardHeader
                            title={this.props.opportunity.title}
                            subheader={`Role: ${this.props.opportunity.certification_name}`}
                        />
                        <Typography className={classes.typography} component="p">
                            {moment(this.props.opportunity.date).format("dddd, MMMM D, YYYY")} <br />
                            {moment(this.props.opportunity.start_time, 'h:mm a').format('h:mm a')} –
                            {moment(this.props.opportunity.end_time, 'h:mm a').format('h:mm a')} <br />
                        </Typography>
                        <Typography className={classes.typography} component="p">
                            Location: <br />
                            {this.props.opportunity.address_line1}
                            {this.props.opportunity.address_line2}<br />
                            {this.props.opportunity.city}, {this.props.opportunity.state} {this.props.opportunity.zip}<br />
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.actions}>
                        <div>{statusButton}</div>
                        {buttons}
                    </CardActions>
                </Card>
                <Dialog
                    className={this.props.classes.dialog}
                    aria-labelledby="edit a volunteer event"
                    open={this.state.editEventIsOpen}
                    onClose={this.handleCloseDialog}
                >
                    <DialogTitle>{"Edit Opportunity"}</DialogTitle>
                    <DialogContent>
                        <EditOpportunityForm
                            opportunityId={this.state.opportunityId}
                            opportunityToUpdate={this.state.opportunityToUpdate}
                            closeEditOpportunity={this.closeEditOpportunity}
                        />
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(withStyles(styles)(MediaCard));
