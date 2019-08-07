import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CardContent from '@material-ui/core/CardContent';

class UserTreeItem extends Component {
    componentDidMount = () => {
        this.getPercentage();
    }

    handleRecent = () => {
        this.props.dispatch({type: 'ADD_RECENT', payload: {tree_id: this.props.tree.tree_id, user_id: this.props.user.id}})
    }

    getPercentage = () => {
        let completedLessons = []
        let treeLessons = []
        for(let currentLesson of this.props.reduxStore.lessonStatusReducer){
            if(currentLesson.tree_id === this.props.tree.tree_id){
                completedLessons.push(currentLesson);
            }
        }
        for(let currentLesson of this.props.reduxStore.lessonsReducer){
            if(currentLesson.tree === this.props.tree.subject){
                treeLessons.push(currentLesson);
            }
        }
        return (completedLessons.length/treeLessons.length) * 100;
    }
    
    render(){
        return(
            <CardContent>
                <Link onClick={this.handleRecent} to={`/tree/${this.props.tree.tree_id}`}>{this.props.tree.subject}</Link> <br /> {this.getPercentage()}% Finished
            </CardContent>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    user: reduxStore.user,
    reduxStore
})

export default connect(mapReduxStoreToProps)(UserTreeItem);