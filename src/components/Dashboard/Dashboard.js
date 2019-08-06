import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Sidebar from '../Sidebar/Sidebar';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Dashboard extends Component{
  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_TREES'});
    this.props.dispatch({type: 'FETCH_LESSONS'})
  }

  render(){
    console.log(this.props.state.treesReducer);
    return(
      <div className="dashboard">
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
        <p>Your ID is: {this.props.user.id}</p>
        {this.props.state.treesReducer.map((tree, i) => <p key={i}>{tree.subject}</p>)}
        <LogOutButton history={this.props.history} className="log-in" />
        <Sidebar history={this.props.history} />
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
export default connect(mapStateToProps)(Dashboard);
