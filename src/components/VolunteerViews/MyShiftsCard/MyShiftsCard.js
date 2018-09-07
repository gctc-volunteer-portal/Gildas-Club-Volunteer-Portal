import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
        <CardMedia
          className={classes.media}
          image={props.shift.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.shift.title}
          </Typography>
          <Typography gutterBottom component="h2">
            Date: {props.shift.date}
          </Typography>
          <Typography gutterBottom component="h2">
            Start Time: {props.shift.start_time}
          </Typography>
          <Typography gutterBottom component="h2">
            End Time: {props.shift.end_time}
          </Typography>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary">
          More Details
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);