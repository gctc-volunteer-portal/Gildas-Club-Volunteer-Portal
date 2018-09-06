import React, { Component } from 'react';
import { withStyles, Dialog, DialogContent, DialogContentText, DialogTitle, withMobileDialog } from '@material-ui/core';
import CreateOpportunityForm from '../CreateOpportunityForm/CreateOpportunityForm';


const styles = {
  dialogTitle: {
    // textAlign: 'center',
  },
  dialog: {
    textAlign: 'center',
    height: '100vh',
  }

};
class CreateOpportunityDialogue extends Component {

  render() {
    return (
      <React.Fragment>
        <Dialog
          // fullScreen
          // maxWidth={"lg"}
          scroll={"body"}
          className={this.props.classes.dialog}
          open={this.props.createEventIsOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Volunteers for "}</DialogTitle>
          <DialogContent>

            <CreateOpportunityForm
              closeCreateEvent={this.props.closeCreateEvent}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}

const StyledCreateOpportunityDialogue = withStyles(styles)(CreateOpportunityDialogue)

export default withMobileDialog()(StyledCreateOpportunityDialogue);