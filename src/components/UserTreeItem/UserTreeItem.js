import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        textAlign: 'center'
    },
    action: {
        justifyContent: 'center',
    },
    button: {
        fontSize: '10px',
        width: '150px', 
    },
    percent: {
        fontSize: '.75em'
    }
})


class UserTreeItem extends Component {
    componentDidMount = () => {
        this.getPercentage();
    }

    handleGoTree = () => {
        this.props.dispatch({ type: 'ADD_RECENT', payload: { tree_id: this.props.tree.tree_id, user_id: this.props.user.id } })
        this.props.history.push(`/tree/${this.props.tree.tree_id}`)
    }

    handleRemove = () => {
        this.props.dispatch({type: 'REMOVE_USER_TREE', payload: { tree_id: this.props.tree.tree_id}})
    }

    getPercentage = () => {
        let completedLessons = []
        let treeLessons = []
        for(let currentLesson of this.props.reduxStore.lessonStatusReducer){
            if(currentLesson.tree_id === this.props.tree.tree_id && this.props.reduxStore.user.id === currentLesson.user_id){
                completedLessons.push(currentLesson);
            }
        }
        for(let currentLesson of this.props.reduxStore.lessonsReducer){
            if(currentLesson.tree === this.props.tree.subject){
                treeLessons.push(currentLesson);
            }
        }
        return Math.round((completedLessons.length/treeLessons.length) * 100);
    }
    
    render(){
        const {classes} = this.props;
        return(
            <>
            <CardContent className={classes.card}>
                <Typography>{this.props.tree.subject}</Typography>
                <br />
                <br />
                <LinearProgress variant="determinate" value={this.getPercentage()}/>
                 <Typography className={classes.percent} >{this.getPercentage()}% Finished</Typography>
            </CardContent>
            <CardActions className={classes.action}>
                <Button className={classes.button} onClick={this.handleGoTree} variant="contained" color="primary">Go to Tree</Button>
                <Button className={classes.button} onClick={event => this.handleRemove(event)} variant="contained" color="secondary">Remove Tree</Button>
            </CardActions>
            <hr />
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    user: reduxStore.user,
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(UserTreeItem));