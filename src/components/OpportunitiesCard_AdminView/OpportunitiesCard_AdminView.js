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
import {connect} from 'react-redux'
import AdminManageVolunteersDialogue from '../AdminManageVolunteersDialogue/AdminManageVolunteersDialogue';


const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 350,
        width: '100%'

    },

};

class MediaCard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.dispatch({type:'GET_EVENT_VOLUNTEERS', payload: this.props.opportunity.id})
    }
    render() {
        const { classes } = this.props;
        return (
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
                    <Button onClick={this.handleClickOpen}>Edit Opportunity</Button>
                    <AdminManageVolunteersDialogue 
                        opportunity = {this.props.opportunity}

                    />
                </CardActions>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(MediaCard));