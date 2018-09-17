import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import moment from 'moment';
import swal from 'sweetalert';

const styles = {
    button: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    dialog: {
        padding: 10,
    },
};

class VolunteerOpportunityDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.props.dispatch({
            type: 'CHECK_ENROLLED',
            payload: {
                volunteerId: this.props.user.id,
                opportunityId: this.props.opportunity.id,
            }
        });
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    signUp = () => {
        swal(
            {
                text: 
                `Hey ${this.props.user.first_name},

                Thank you for volunteering with us. We hope to see you soon!`,
                icon: "success",
                color: 'primary',
            });
        this.props.dispatch({
            type: 'VOLUNTEER_ENROLL_VOLUNTEER',
            payload: {
                volunteerId: this.props.user.id,
                opportunityId: this.props.opportunity.id,
            }
        });
        this.handleClose();
    }

    withdraw = () => {
        if (moment(new Date()).add(2, 'days').format() >= this.props.opportunity.date) {
            swal({
                title: "Oops...",
                text: `You can only withdraw within 48 hours of the volunteer opportunity. Please contact Gilda's Club Twin Cities at 
                (612) 227-2147.`,
                icon: "warning",
                dangerMode: true,
                color: 'primary',
            });
        } else {
            swal(
                {
                    text: "You have successfully withdrawn from this volunteer opportunity.",
                    icon: "success",
                    color: 'primary',
                });
            this.props.dispatch({
                type: 'VOLUNTEER_DELETE_ITEM',
                payload: {
                    volunteerId: this.props.user.id,
                    opportunityId: this.props.opportunity.id,
                }
            });
        }

        this.handleClose();
    }
    render() {

        let buttonToShow = null;

        if (this.props.enrollment) {
            buttonToShow = (
                <Button onClick={this.withdraw} color="primary" autoFocus>
                    Withdraw
                </Button>
            )
        }

        else {
            buttonToShow = (
                <Button onClick={this.signUp} color="primary" autoFocus>
                    Sign Up
                </Button>
            )
        }

        return (
            <div>
                <Button className={this.props.classes.button} variant="raised" color="primary" onClick={this.handleClickOpen}>More Info</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className={this.props.classes.dialog}
                >
                    <DialogTitle id="alert-dialog-title">{this.props.opportunity.title}</DialogTitle>
                    <DialogContent>
                        <img src={this.props.opportunity.upload_image} alt="opportunity" height="300" width="300" />
                    </DialogContent>
                    <DialogTitle id="alert-dialog-title">{this.props.opportunity.certification_name}</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Date: {moment(this.props.opportunity.date).format('dddd, MMMM D, YYYY')}
                        </DialogContentText>

                        <DialogContentText id="alert-dialog-description">
                            Time: {moment(this.props.opportunity.start_time, 'h:mm a').format('h:mm a')} – {moment(this.props.opportunity.end_time, 'h:mm a').format('h:mm a')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Location:
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.opportunity.address_line1}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.opportunity.address_line2}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.opportunity.city}, {this.props.opportunity.state} {this.props.opportunity.zip}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.opportunity.description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                        {buttonToShow}

                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    enrollment: state.opportunitiesReducer.enrolledStatus
})


const connectedVolunteerOpportunityDialog = connect(mapStateToProps)(VolunteerOpportunityDialog);

export default withStyles(styles)(connectedVolunteerOpportunityDialog);