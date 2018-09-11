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

const styles = {

    card: {
        width: '90%',
        position: 'relative',
        minHeight: 350,
        margin: 20,
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
        alignItems: 'flex-end',
    },
    buttonGroup: {
        display: 'inline-flex',
    },
};

class MediaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editEventIsOpen: false,
            opportunityToUpdate: {},
            opportunityId: '',
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

    render() {
        const { classes } = this.props;
        let buttons;
        let status;
        if (this.props.opportunity.status == 1) {
            status = 'Staging'
        } else if (this.props.opportunity.status == 2) {
            status = 'Active'
        } else {
            status = 'Inactive'
        }
        if (this.props.state.user.access_level >= 2 && this.props.admin) {
            buttons = (<div className={classes.buttonGroup}>
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
            </div>)
        } else {
            buttons = (
                <div className={classes.buttonGroup}>
                    <VolunteerOpportunityDialog opportunity={this.props.opportunity} />
                </div>
            )
        }

        return (
            <React.Fragment>
                <Card className={classes.card}>
                    <CardContent>
                        <CardMedia
                            className={classes.media}
                            image={this.props.opportunity.image}
                            height="350"
                            width="350"
                            title="Opportunity"
                        />
                    </CardContent>
                    <React.Fragment>
                        <CardContent className={classes.detail}>
                            <CardHeader
                                title={this.props.opportunity.title}
                                subheader={`Role: ${this.props.opportunity.certification_name}`}
                            />
                            <Typography className={classes.typography} component="p">
                                {moment(this.props.opportunity.date).format("dddd, MMMM D, YYYY")}	<br />
                                {moment(this.props.opportunity.start_time, 'h:mm a').format('h:mm a')} <br />
                                {moment(this.props.opportunity.end_time, 'h:mm a').format('h:mm a')} <br />
                            </Typography>
                            <Typography className={classes.typography} component="p">
                                Location: <br />
                                {this.props.opportunity.address_line1}<br />
                                {this.props.opportunity.city}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                    <CardActions className={classes.actions}>
                        <CardHeader
                            subheader={status}
                        />
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
            </React.Fragment >
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
