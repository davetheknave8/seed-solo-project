import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';

class SuggestedLessonItem extends Component{
    state = {
        suggestedLesson: {tree: ''}
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_LESSONS'})
        this.getSuggestedLessons();
    }
    
    getSuggestedLessons = () => {
        let completedLessons = []
        let treeLessons = []
        for (let currentLesson of this.props.reduxStore.lessonStatusReducer) {
            if (currentLesson.tree_id === this.props.tree.tree_id) {
                completedLessons.push(currentLesson);
            }
        }
        for (let currentLesson of this.props.reduxStore.lessonsReducer) {
            if (currentLesson.tree === this.props.tree.subject) {
                treeLessons.push(currentLesson);
            }
        }
        if(completedLessons.length !== 0 && treeLessons.length !== 0){
            return treeLessons[completedLessons.length]
        }else if(completedLessons.length === 0 && treeLessons.length !== 0) {
            return treeLessons[0];
        }else {
            return '';
        }
    }
    
    render(){
        console.log(this.getSuggestedLessons());
        return(
            <>
            {this.getSuggestedLessons() !== undefined ? <> <Typography>{ this.props.tree.subject }</Typography>
            <List>
                <ListItem>
                        <Link to={`/lesson/${this.getSuggestedLessons() !== '' && this.getSuggestedLessons() !== undefined ? this.getSuggestedLessons().lesson_id : ''}`}>{this.getSuggestedLessons() !== '' && this.getSuggestedLessons() !== undefined ? this.getSuggestedLessons().lesson:<></>}</Link>
                </ListItem>
            </List>
                </> : <> </>
        }
        </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(SuggestedLessonItem);