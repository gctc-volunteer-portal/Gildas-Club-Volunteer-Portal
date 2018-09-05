import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { connect } from 'react-redux'
import AdminManageVolunteersDialogueTable from '../AdminManageVolunteersDialogueTable/AdminManageVolunteersDialgueTable'
import AdminManageVolunteersDialogueAutoComplete from '../AdminManageVolunteersDialogueAutoComplete/AdminManageVolunteersDialogueAutoComplete'



class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount(){
    this.props.dispatch({
      type: 'GET_USERS'
    })
    this.props.dispatch({
      type: ''
    })
  }

  render() {
    const { fullScreen } = this.props;
    console.log(this.props.state);
    

    return (
      <div>
      
        <Button onClick={this.handleClickOpen}>Manage Volunteers</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Volunteers for "}</DialogTitle>
          <AdminManageVolunteersDialogueTable opportunity = {this.props.opportunity}/>
          <AdminManageVolunteersDialogueAutoComplete/>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    state
  });

export default connect(mapStateToProps)(withMobileDialog()(ResponsiveDialog));