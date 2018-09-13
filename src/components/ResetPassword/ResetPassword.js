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

class Reset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmedPassword: '',
            queryParams: '',
            helperText: '',
        };
    }


    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
            queryParams: this.props.location.search
        });
    }

    resetPassword = (event) => {
        event.preventDefault();
        if(this.state.password !== this.state.confirmedPassword) {
            this.setState({
                helperText: 'Passwords must match',
            });
        }
        else{
            this.setState({
                helperText: '',
            });
            this.props.dispatch({
                type: 'UPDATE_PASSWORD',
                payload: this.state,
            });
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <div>
                <Header />
                <form onSubmit={this.resetPassword}>
                    <h1>Reset Password</h1>
                    <TextField
                        id="email"
                        label="Email"
                        className={this.props.classes.textField}
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.handleInputChangeFor('email')}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="New Password"
                        className={this.props.classes.textField}
                        placeholder="New Password"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor('password')}
                        margin="normal"
                        type="password"
                    />
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        className={this.props.classes.textField}
                        placeholder="Confirm Password"
                        value={this.state.confirmedPassword}
                        onChange={this.handleInputChangeFor('confirmedPassword')}
                        margin="normal"
                        type="password"
                        helperText={this.state.helperText}
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
            </div>
        )
    }
}

const connectedReset = connect()(Reset)
export default withStyles(styles)(connectedReset);