import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { USER_ACTIONS } from '../../redux/actions/userActions';
import AdminManageVolunteersDialogue from '../AdminManageVolunteersDialogue/AdminManageVolunteersDialogue';


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
};

class MediaCard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'GET_EVENT_VOLUNTEERS', payload: this.props.opportunity.id })
    }

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
            <Card className={classes.card}>
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
                    <CardActionArea>
                <CardActions>
                    {/* <Button size="small" color="primary">
                        Volunteer
                    </Button>
                    <Button onClick={this.handleClickOpen}>More Info</Button> */}
                    {buttons}
                </CardActions>
                </CardActionArea>
            </Card>
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