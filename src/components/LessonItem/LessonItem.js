import React, {Component} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';

import './LessonItem.css'

class LessonItem extends Component {
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_LESSON_STATUS'});
    }

    render(){
        let completed = false;
        console.log(this.props.reduxStore.lessonStatusReducer)
        for(let currentLesson of this.props.reduxStore.lessonStatusReducer){
            if (currentLesson.lesson_id === this.props.lesson.lesson_name.id && this.props.reduxStore.user.id === currentLesson.user_id){
                completed = true;
            }
        }
        console.log(completed)
        console.log(this.props.lesson.lesson_name.name)
        if(completed === false){
        return(
            <>
            
                <Typography>{this.props.lesson.lesson_name.name}</Typography>
            </>
        )} else if(completed === true){
            return(
                <>
                <Typography><span className='completed'>{this.props.lesson.lesson_name.name}</span> 
                <span className='small'>       Complete</span></Typography>
                
                </>
            )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(LessonItem);