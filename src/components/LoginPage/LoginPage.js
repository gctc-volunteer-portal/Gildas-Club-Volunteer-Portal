import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Header from '../Header/Header';

import { TextField, Button } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignText:'center'
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


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email !== null && this.props.user.access_level === 3) {
      this.props.history.push('/manage_volunteers');
    } else if (!this.props.user.isLoading && this.props.user.email !== null){
      this.props.history.push('/my_shifts')
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.email === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.email, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.login}>
          <h1>Login</h1>
            <TextField
              id="email"
              label="Email"
              className={this.props.classes.textField}
              helperText={this.props.login.message}
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              className={this.props.classes.textField}
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              margin="normal"
              type="password"
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
              Log In
              </Button>
              <Link to="/register">Register</Link>
              <br />
              <Link to="/forgot_password">Forgot My Password</Link>
            </div>
        </form>
      </div>
        );
      }
    }
    
    const connectedLoginPage = connect(mapStateToProps)(LoginPage);
    export default withStyles(styles)(connectedLoginPage);