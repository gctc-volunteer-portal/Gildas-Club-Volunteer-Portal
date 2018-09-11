import React, { Component } from 'react';
import { withStyles, Dialog, DialogContent, DialogTitle, withMobileDialog } from '@material-ui/core';
import CreateOpportunityForm from '../CreateOpportunityForm/CreateOpportunityForm';


const styles = {
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
          scroll={"body"}
          className={this.props.classes.dialog}
          open={this.props.createEventIsOpen}
          onClose={this.handleClose}
          aria-labelledby="create a volunteer opportunity"
        >
          <DialogTitle>{"Create Volunteer Opportunity"}</DialogTitle>
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