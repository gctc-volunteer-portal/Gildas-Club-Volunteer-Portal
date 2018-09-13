import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header/Header';

import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: 10,
        display: 'flex',
        alignItems: 'center',
    },
});

class RequestReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            helperText: '',
            submittedText: '',
        };
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    submitResetRequest = (event) => {
        event.preventDefault();
        if(this.state.email === '') {
            this.setState({
                helperText: 'Please enter your email',
            });
        }
        else{
            this.setState({
                helperText: '',
                submittedText: 'Your request has been submitted. Check your email for a link to reset!',
            });
            this.props.dispatch({
                type: 'REQUEST_RESET',
                payload: this.state,
            });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <form onSubmit={this.submitResetRequest}>
                    <h1>Forgot Password</h1>
                    <TextField
                        id="email"
                        label="Email"
                        className={this.props.classes.textField}
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.handleInputChangeFor('email')}
                        margin="normal"
                    />
                    <div>
                        <Button
                            className={this.props.classes.button}
                            type="submit"
                            name="submit"
                            value="Log In"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
                {this.state.submittedText}
            </div>
        )
    }
}

const connectedRequestReset = connect()(RequestReset)
export default withStyles(styles)(connectedRequestReset);