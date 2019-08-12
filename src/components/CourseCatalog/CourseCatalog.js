import React, {Component} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {connect} from 'react-redux';
import SearchTreeItem from '../SearchTreeItem/SearchTreeItem';

import './CourseCatalog.css';

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/Textfield';
import {withStyles} from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  searchIn: {
    backgroundColor: 'white',
    marginTop: '60px',
    marginLeft: '30%',
    width: '40%',
    margin: theme.spacing.unit,
  },
  submitBtn: {
    margin: theme.spacing.unit,
    marginTop: '60px',
    height: '40px'
  },
  searchTable: {
    width: '70%',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  subjectCell: {
    width: '20%'
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
    this.props.dispatch({ type: 'FETCH_SEARCH', payload: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({query: ''});
    this.props.dispatch({type: 'FETCH_SEARCH', payload: this.state.query})
    console.log('submitted');
  }

  render(){
    console.log(this.props.reduxStore.user)
    const {classes} = this.props;
    return(
      <div className="catalog">        
        <Grid container>
            {this.props.reduxStore.user.id?<Grid item sm={1}>
              <Sidebar history={this.props.history} />
            </Grid>:<></>}
            <Grid item sm={12}>
              <header className="search">
                <h1 className="search-title">Search Catalog</h1>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                  value={this.state.query}
                  className={classes.searchIn}
                  variant="outlined"
                  onChange={event => this.handleChange(event)}
                  onSubmit={event => this.handleSubmit(event)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                  }}
                  />
                </form>
              </header>
            </Grid>
        </Grid>
        {this.props.reduxStore.searchReducer !== [] && this.state.query !== ''?
        <Table className={classes.searchTable}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.subjectCell}>Subject</TableCell>
              <TableCell className={classes.descriptionCell}>Description</TableCell>
              {!this.props.reduxStore.user.logged?
                <TableCell>&nbsp;</TableCell>
                :<></>}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxStore.searchReducer.map((tree, i) => <SearchTreeItem tree={tree} key={i} />)}
          </TableBody>
        </Table>
        :<></>}          
      </div>
    )
  }
};

const mapReduxStoreToProps = reduxStore => ({
  reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(CourseCatalog));
