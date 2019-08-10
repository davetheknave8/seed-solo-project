import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LoginPage.css';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
    marginBottom: '35px',
    width: '100%',
    backgroundColor: 'white',
    fontFamily: 'Lato'
  }
})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container>
        <Grid item sm={12}>
      <div className="login">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form className='login-form' onSubmit={this.login}>
          <h1>Seed.</h1>
          <div>
              <TextField
                className={classes.input}
                variant="outlined"
                label="Username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
              <TextField
                className={classes.input}
                variant="outlined"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center>
      </div>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
