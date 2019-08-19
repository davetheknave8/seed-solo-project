import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    }
})

class SearchTreeItem extends Component {
    state = {
        show: false
    }

    handleAdd = (event) => {
        this.props.dispatch({type: 'ADD_USER_TREE', payload: {user_id: this.props.reduxStore.user.id, tree_id: this.props.tree.id}})
        this.props.dispatch({ type: 'FETCH_ALL_USER_TREES' })
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    render(){
        const {classes} = this.props;
        let add = true;
        for(let tree of this.props.reduxStore.allUserTreesReducer){
            if(tree.tree_id === this.props.tree.id && this.props.reduxStore.user.id === tree.user_id){
                add = false;
            }
        }
        return(
            <>
            {this.props.tree.status === 'complete' ?
            <TableRow>
                <TableCell>{this.props.tree.subject}</TableCell>
                <TableCell>{this.props.tree.description}</TableCell>
                {!this.props.reduxStore.user.logged && add === true?
                <TableCell><Button variant="contained" color="primary" onClick={event => this.handleAdd(event)}>Add Tree</Button></TableCell>
                :<></>}
            </TableRow>
            : <></>
            }
            <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.show}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Tree added!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
            />

            
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(SearchTreeItem));