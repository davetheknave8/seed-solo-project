import React, {Component} from 'react';
import {connect} from 'react-redux';

class Admin extends Component {
    render(){
        if(this.props.reduxStore.user.admin === 3)
        return(
            <>
            <p>Admin Page</p>
            </>
        )
        else{
            return(
            <>
            <p>You do not have the permission to access this page.</p>
            </>
            )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(Admin);