import React, {Component} from 'react';
import {connect} from 'react-redux';
import SideBar from '../Sidebar/Sidebar';

//Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

class LessonView extends Component{
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_CURRENT_LESSON', payload: this.props.match.params.id})
    }
    
    render(){
        console.log(this.props.reduxStore.currentLessonReducer);
        return(
            <>

            <SideBar history={this.props.history} />
            </>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(LessonView);