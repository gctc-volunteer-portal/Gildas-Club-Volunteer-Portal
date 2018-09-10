import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles, Card, CardMedia, CardActionArea, CardContent,
    CardActions, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography
} from '@material-ui/core/';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux'
import AdminManageVolunteersDialogue from '../AdminManageVolunteersDialogue/AdminManageVolunteersDialogue';
import EditOpportunityForm from '../EditOpportunityForm/EditOpportunityForm';


const styles = {
    card: {
        width: '80%',
        height: 350,
        display: 'flex',
        margin: 30
    },
    media: {
        height: 350,
        width: 300
    },
    dialog: {
        textAlign: 'center',
        height: '100vh',
    }

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
        this.props.dispatch({ type: 'GET_EVENT_VOLUNTEERS', payload: this.props.opportunity.id })
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
        if (this.props.state.user.access_level == 3) {
            buttons = (<div>                           
                            <Button size="small" color="primary" variant="raised" onClick={this.handleClickOpen}>More Info</Button>
                            <AdminManageVolunteersDialogue
                                opportunity={this.props.opportunity}
                            />
                            </div>)
        } else{
            buttons = ( <div>
                            <Button size="small" color="primary" variant="raised">
                             Volunteer
                            </Button>
                        </div>
            )}

        return (
            <React.Fragment>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://www.gildasclubtwincities.org/wp-content/themes/skeleton/images/logo.png"
                            title="Opportunity"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.props.opportunity.title}
                            </Typography>
                        <Typography component="p">	
                            {this.props.opportunity.address_line1}<br />	
                            {this.props.opportunity.city}	
                        </Typography>
                                    <Typography component="p">	
                            {this.props.opportunity.description}	
                        </Typography>	
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button
                            color="primary"
                            variant="raised"
                            size="small"
                            onClick={() => this.openEditOpportunity(this.props.opportunity.id, this.props.opportunity)}
                        >
                            Edit Opportunity
                        </Button>
                        <AdminManageVolunteersDialogue
                            opportunity={this.props.opportunity}
                        />
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
