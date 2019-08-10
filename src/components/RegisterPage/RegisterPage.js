import React, { Component } from 'react';
import {connect} from 'react-redux';

import './RegisterPage.css';

import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
    marginBottom: '35px',
    width: '100%',
    backgroundColor: 'white'
  }
})

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className='registerPage'>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className='register-form' onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
              <TextField
                variant="outlined"
                className={classes.input}
                label="Username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
              <TextField
                variant="outlined"
                className={classes.input}
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

