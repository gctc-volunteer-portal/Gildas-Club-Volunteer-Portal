import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles, Card, CardMedia, CardActionArea, CardContent,
    CardActions, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography
} from '@material-ui/core/';

import { connect } from 'react-redux'
import AdminManageVolunteersDialogue from '../AdminManageVolunteersDialogue/AdminManageVolunteersDialogue';
import EditOpportunityForm from '../EditOpportunityForm/EditOpportunityForm';


const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 350,
        width: '100%'
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
        console.log(this.state, 'local state')
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://www.gildasclubtwincities.org/wp-content/themes/skeleton/images/logo.png"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.props.opportunity.title}
                            </Typography>
                            <Typography component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                    </Button>
                        <Button
                            onClick={() => this.openEditOpportunity(this.props.opportunity.id, this.props.opportunity)}

                        >Edit Opportunity</Button>
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
                            eventId={this.state.eventId}
                            eventToUpdate={this.state.eventToUpdate}
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

export default connect()(withStyles(styles)(MediaCard));