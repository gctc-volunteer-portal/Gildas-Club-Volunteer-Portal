import React, { Component } from 'react'
import { withStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog, Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

class OpportunityAdminNoteDialogue extends Component {
  state = {
    open: false,
    edit: false,
    private_notes: this.props.opportunityNote
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickEdit = () => {
    this.setState({ edit: true });
  };

  handleCloseEdit = () => {
    this.setState({ edit: false });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdate = () => {
    this.props.dispatch({
      type: 'UPDATE_OPPORTUNITY_ADMIN_NOTE', payload: {
        opportunityId: this.props.opportunityId,
        updateOpportunityNote: this.state.private_notes
      }
    })
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button
          color="primary"
          variant="raised"
          size="small"
          onClick={this.handleClickOpen}
        >
          View Notes
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive dialog containing admin notes"
        >
          <DialogTitle >{'Administrative Notes'}</DialogTitle>

          <DialogContent>
            <DialogContentText>
              {this.props.opportunityNote}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickEdit}
              color="secondary"
              variant="raised"
              size="small">
              Edit
            </Button>

            <Button onClick={this.handleClose} color="primary"
              variant="raised"
              size="small" autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={this.state.edit}
          onClose={this.handleClose}
          aria-labelledby="responsive dialog containing admin notes"
        >
          <DialogTitle >{'Administrative Notes'}</DialogTitle>

          <DialogContent>
              <TextField
                label="Admin Notes"
                type="text"
                name=""
                fullWidth
                multiline
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder={this.props.opportunityNote}
                onChange={this.handleInputChangeFor('private_notes')}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEdit}
              color="secondary"
              variant="raised"
              size="small">
              Cancel
            </Button>

            <Button onClick={this.handleUpdate} color="primary"
              variant="raised"
              size="small" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

const StyledEditOpportunityForm = withStyles(styles)(OpportunityAdminNoteDialogue)

export default OpportunityAdminNoteDialogue;