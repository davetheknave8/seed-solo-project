import React, {Component} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {connect} from 'react-redux';

import './CourseCatalog.css';

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  searchIn: {
    backgroundColor: 'white',
    marginTop: '60px',
    marginLeft: '30%',
    width: '40%'
  }
})
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class CourseCatalog extends Component{
  state = {
    query: ''
  }

  handleChange = event => {
    this.setState({query: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('submitted');

  }
  render(){
    const {classes} = this.props;
    return(
      <div className="catalog">        
        <Grid container>
            {this.props.reduxStore.user.id?<Grid item sm={1}>
              <Sidebar history={this.props.history} />
            </Grid>:<></>}
            <Grid item sm={12}>
              <header className="search">
                <h1 className="search-title">Search</h1>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                  className={classes.searchIn}
                  label="Search Trees"
                  variant="outlined"
                  onChange={event => this.handleChange(event)}
                  onSubmit={event => this.handleSubmit(event)}
                  />
                  <Button type="submit"></Button>
                </form>
              </header>
            </Grid>
        </Grid>
      </div>
    )
  }
};

const mapReduxStoreToProps = reduxStore => ({
  reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(CourseCatalog));
