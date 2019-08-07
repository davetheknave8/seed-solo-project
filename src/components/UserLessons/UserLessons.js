import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserLessons extends Component{
    render(){
        return(
            <>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    user: reduxStore.user,
    reduxStore
})

export default connect(mapReduxStoreToProps)(UserLessons);