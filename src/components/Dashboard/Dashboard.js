import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Sidebar from '../Sidebar/Sidebar';
import UserTrees from '../UserTrees/UserTrees';
import RecentTree from '../RecentTree/RecentTree';
import SuggestedLessons from '../SuggestedLessons/SuggestedLessons';

import './Dashboard.css';

//Material-UI
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  gridTwo: {
    backgroundColor: 'rgba(254, 250, 192, .40)',
    paddingBottom: '2vh'
  }
})

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Dashboard extends Component{
  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_TREES'});
    this.props.dispatch({type: 'FETCH_LESSONS'});
    this.props.dispatch({type: 'FETCH_LESSON_STATUS'})
  }

  render(){
    const {classes} = this.props;
    return(
      <div className="dashboard">
        
        <Grid container>
          <Grid item sm={1}>
            <Sidebar history={this.props.history} />
          </Grid>
          <Grid item sm={3}>
            <h1 className='welcome'>
              Hello, {this.props.user.username}
            </h1>
          </Grid>
          
        </Grid>
        <Grid container className={classes.gridTwo}>
          <Grid item sm={2} />
          <Grid item sm={3}>
            <UserTrees />
          </Grid>
          <Grid item sm={3}>
            <RecentTree />
          </Grid>
          <Grid item sm={3}>
            <SuggestedLessons />
          </Grid>
        </Grid>
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  state
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
