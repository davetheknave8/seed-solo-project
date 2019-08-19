import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import './LessonItem.css'


const styles = theme => ({
    small: {
        fontSize: '.5em',
        float: 'right',
        marginRight: '3vh',
        color: 'green'
    },
    completed: {
        textDecoration: 'line-through',
        marginLeft: '3vh'
    },
    lesson: {
        marginLeft: '3vh'
    }
})

class LessonItem extends Component {
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_LESSON_STATUS'});
    }

    render(){
        const {classes} = this.props;
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
            
                <Link to={`/lesson/${this.props.lesson.id}`} className={classes.lesson}>{this.props.lesson.lesson_name.name}</Link>
                <hr />
            </>
        )} else if(completed === true){
            return(
                <>
                <div className={classes.completedItem}>
                <Link to={`/lesson/${this.props.lesson.id}`} className={classes.completed}>{this.props.lesson.lesson_name.name}</Link> 
                <Typography className={classes.small}>Complete</Typography>                
                </div>
                <hr />
                </>
            )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(LessonItem));