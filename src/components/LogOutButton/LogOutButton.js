import React, {Component} from 'react';
import { connect } from 'react-redux';

//Material-UI
import Button from '@material-ui/core/Button';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';

class LogOutButton extends Component{
  handleLogOut = () => {
    this.props.dispatch({ type: 'LOGOUT' })
    this.props.history.push('/home')
  }
  
  render(){
    console.log(this.props.className);
    return(
      <Button
        // This Button shows up in multiple locations and is styled differently
        // because it's styled differently depending on where it is used, the className
        // is passed to it from it's parents through React props
        className={this.props.className}
        onClick={() => this.handleLogOut()}
      >
        {this.props.sidebar ? <ListItemIcon><LogoutIcon /></ListItemIcon>:'Logout'}
      </Button>
    )
  }
}

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
