import React, {Component} from 'react';

import ListItem from '@material-ui/core/ListItem';

class AdminUserItem extends Component{
    
    render(){
        console.log(this.props.user);
        console.log(this.props.tree);
        if(this.props.user.tree_id === this.props.tree.id){
        return(
            <>
                <ListItem>{this.props.user.username}</ListItem>
            </>
        )
        } else{
            return(
                <>
                </>
            )
        }
    }
}

export default AdminUserItem;