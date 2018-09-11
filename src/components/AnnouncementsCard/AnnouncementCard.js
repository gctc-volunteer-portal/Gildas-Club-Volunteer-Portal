import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import AnnouncementCardDialog from '../AnnouncementsCardDialog/AnnouncementsCardDialog';
import moment from 'moment';



import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    margin: 50
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class SimpleCard extends Component {


    handleDelete = (announcementId) => { 
        // console.log(announcementId);
         this.props.dispatch({
            type: 'DELETE_ANNOUNCEMENT',
            payload: announcementId
          });
        }


  render(){
    let button;
    const { classes } = this.props;
    if (this.props.user.access_level === 3){
          button = (<Button onClick={()=>this.handleDelete(this.props.announcement.id)} variant="small" color="secondary" className={classes.button}>
              Delete
              <DeleteIcon className={classes.rightIcon} />
              </Button>)
    }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
         {moment(this.props.announcement.date).format("dddd, MMM D, YYYY")}
        </Typography>
        <Typography variant="headline" component="h2">
         {this.props.announcement.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        </Typography>
      </CardContent>
      <CardActions>
       <AnnouncementCardDialog
           announcement = {this.props.announcement}
       />
        {button}
      </CardActions>
    </Card>
  );
}
}


const mapStateToProps = state => ({
    user: state.user
  });

export default connect(mapStateToProps)(withStyles(styles)(SimpleCard));