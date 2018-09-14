import React, { Component } from 'react'
import { withStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  adminDialog: {
    margin: '0 auto',
    textAlign: 'center',
  },
  editDialog: {
    margin: '0 auto',
    textAlign: 'center',
    width: '85%',

  },
  textField: {
    width: '600px',
    overflow: 'hidden',
  },
  button: {
    margin: 5,
    display: 'flex',
    alignItems: 'flex-end',
  },
}
class OpportunityAdminNoteDialogue extends Component {

  state = {
    open: false,
    edit: false,
    private_notes: this.props.opportunityNote,
    new_notes: this.props.opportunityNote,
    current_notes: '',
  };


  handleClickOpen = () => {
    this.setState({ open: true });

  };

  handleClickEdit = () => {
    this.setState({ edit: true });
  };

  handleCancelEdit = () => {
    this.state.new_notes != this.state.private_notes ?
      this.setState({
        new_notes: this.state.private_notes,
        current_notes: '',
        edit: false,
        open: false,

      }) :
      this.setState({
        edit: false,
        open: false,
      });
  };

  handleClickOkay = () => {
    this.setState({ open: false });
  };

  handleUpdate = () => {
    this.props.dispatch({
      type: 'UPDATE_OPPORTUNITY_ADMIN_NOTE', payload: {
        opportunityId: this.props.opportunityId,
        updateOpportunityNote: this.state
      }
    })

    this.setState({
      private_notes: this.state.current_notes,
      new_notes: this.state.current_notes,
      edit: false,
      open: false,
    })
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
      current_notes: event.target.value
    });
  }

  render() {
    console.log(this.state, 'local state')
    let content = null
    if (this.state.edit == false) {
      content =
        <Dialog
          className={this.props.classes.adminDialog}
          open={this.state.open}
          onClose={this.handleClickOkay}
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
            <Button onClick={this.handleClickOkay} color="primary"
              variant="raised"
              size="small" autoFocus>
              Done
        </Button>
          </DialogActions>
        </Dialog>

    } else {
      content =
        <Dialog
          className={this.props.classes.editDialog}
          open={this.state.edit}
          onClose={this.handleClickOkay}
          aria-labelledby="responsive dialog to edit admin notes"
        >
          <DialogTitle >{'Edit Administrative Notes'}</DialogTitle>

          <DialogContent>
            <TextField
              className={this.props.classes.textField}
              type="text"
              name="Admin Notes"
              multiline={true}
              fullWidth={false}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.new_notes}
              onChange={this.handleInputChangeFor('new_notes')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelEdit}
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
    }

    return (
      <React.Fragment>
        <Button
          className={this.props.classes.button}
          color="primary"
          variant="raised"
          size="small"
          onClick={this.handleClickOpen}
        >
          View Notes
        </Button>
        {content}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  state
});

const StyledOpportunityAdminNoteDialogue = withStyles(styles)(OpportunityAdminNoteDialogue)

export default connect(mapStateToProps)(StyledOpportunityAdminNoteDialogue);