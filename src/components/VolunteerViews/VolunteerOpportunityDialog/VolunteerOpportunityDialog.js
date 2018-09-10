import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

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
        })
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    signUp = () => {
        this.props.dispatch({
            type: 'ENROLL_VOLUNTEER',
            payload: {
                volunteerId: this.props.user.id,
                opportunityId: this.props.opportunity.id,
            }
        })
        this.props.dispatch({
            type: 'CHECK_ENROLLED',
            payload: {
                volunteerId: this.props.user.id,
                opportunityId: this.props.opportunity.id,
            }
        });
    }

    withdraw = () => {
        this.props.dispatch({
            type: 'DELETE_ITEM',
            payload: {
                volunteerId: this.props.user.id,
                opportunityId: this.props.opportunity.id,
            }
        })
        this.props.dispatch({
            type: 'CHECK_ENROLLED',
            payload: {
                volunteerId: this.props.user.id,
                opportunityId: this.props.opportunity.id,
            }
        });
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
                <Button onClick={this.handleClickOpen}>More Info</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.opportunity.title}</DialogTitle>
                    <img src={this.props.opportunity.image} height="150" />
                    <DialogContent>
                        <DialogTitle id="alert-dialog-title">{this.props.opportunity.certification_name}</DialogTitle>
                        <DialogContentText id="alert-dialog-description">
                            Date: {this.props.opportunity.date}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Time: {this.props.opportunity.start_time} – {this.props.opportunity.end_time}
                        </DialogContentText>
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

export default connect(mapStateToProps)(VolunteerOpportunityDialog);