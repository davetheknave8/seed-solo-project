import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class SearchTreeItem extends Component {
    handleAdd = (event) => {
        this.props.dispatch({type: 'ADD_USER_TREE', payload: {user_id: this.props.reduxStore.user.id, tree_id: this.props.tree.id}})
    }

    render(){
        return(
            <>
            <TableRow>
                <TableCell>{this.props.tree.subject}</TableCell>
                <TableCell>{this.props.tree.description}</TableCell>
                {!this.props.reduxStore.user.logged?
                <TableCell><Button variant="contained" color="primary" onClick={event => this.handleAdd(event)}>Add Tree</Button></TableCell>
                :<></>}
            </TableRow>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(SearchTreeItem);