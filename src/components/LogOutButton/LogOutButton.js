import React, {Component} from 'react';
import { connect } from 'react-redux';

class LogOutButton extends Component{
  handleLogOut = () => {
    this.props.dispatch({ type: 'LOGOUT' })
    this.props.history.push('/home')
  }
  
  render(){
    return(
      <button
        // This button shows up in multiple locations and is styled differently
        // because it's styled differently depending on where it is used, the className
        // is passed to it from it's parents through React props
        className={this.props.className}
        onClick={() => this.handleLogOut()}
      >
        Log Out
      </button>
    )
  }
}

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
