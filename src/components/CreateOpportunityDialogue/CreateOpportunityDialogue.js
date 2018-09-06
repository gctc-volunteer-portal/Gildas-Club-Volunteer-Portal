import React, { Component } from 'react';
import { withStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import CreateOpportunityForm from '../CreateOpportunityForm/CreateOpportunityForm';

const styles = {
  dialogTitle: {
    textAlign: 'center',
  },
};
class CreateOpportunityDialogue extends Component {

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.createEventIsOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle className={this.props.classes.dialogTitle}>Create Event</DialogTitle>

          <CreateOpportunityForm
            closeCreateEvent={this.props.closeCreateEvent}

          />
        </Dialog>
      </React.Fragment>
    )
  }
}

const StyledCreateOpportunityDialogue = withStyles(styles)(CreateOpportunityDialogue)

export default StyledCreateOpportunityDialogue