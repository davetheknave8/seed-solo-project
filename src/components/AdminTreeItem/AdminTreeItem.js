import React, {Component} from 'react';
import {connect} from 'react-redux';

import AdminUserItem from '../AdminUserItem/AdminUserItem';

//Material-UI
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
    link: {
        cursor: 'pointer'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflow: 'auto'
    },
    row: {
        backgroundColor: '#dfedd6',
        opacity: '.9'
    }
})


class AdminTreeItem extends Component {
    state = {
        open: false
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_ALL_USER_TREES'})
    }

    handleShowUsers = () => {
        console.log('show');
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render(){
        const {classes} = this.props;
        let numberOfUsers = 0;
        for (let currentUser of this.props.reduxStore.allUserTreesReducer) {
            if (currentUser.tree_id === this.props.tree.id) {
                numberOfUsers++
            }
        }
        return(
            <>
            <TableRow className={classes.row}>
                <TableCell>{this.props.tree.subject}</TableCell>
                <TableCell>{this.props.tree.description}</TableCell>
                <TableCell><Link className={classes.link} onClick={event => this.handleShowUsers(event)}>{numberOfUsers}</Link></TableCell>
            </TableRow>
            <Modal aria-labelledby="user-model"
            aria-describedby="modal-to-show-users"
            open={this.state.open}
            onClose={this.handleClose}
            >
                <div style={{top: '40%', left: '35%'}} className={classes.paper}>
                    <ListSubheader>Users</ListSubheader>
                    <List>
                        {this.props.reduxStore.allUserTreesReducer.map((user, i) => <AdminUserItem key={i} user={user} tree={this.props.tree}/>)}
                    </List>
                </div>
            </Modal>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(AdminTreeItem));