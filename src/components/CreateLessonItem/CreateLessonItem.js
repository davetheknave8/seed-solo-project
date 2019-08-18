import React, {Component} from 'react';
import {connect} from 'react-redux';

import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    lesson: {
        fontSize: '.75em',
    },
    details: {
        height: '4vh',
        paddingBottom: '2vh'
    },
    actions: {
        float: 'right'
    },
    button: {
        marginRight: '1vh'
    }
})

class CreateLessonItem extends Component {
    handleDelete = (event) => {
        this.props.dispatch({type: 'DELETE_LESSON', payload: {lessonId: this.props.lesson.id, treeId: this.props.treeId}})
    }
    render(){
        const {classes} = this.props;
        console.log(this.props.lesson);
        return(
            <>
            <div className={classes.details}>
                <hr />
                <Typography className={classes.lesson}>
                    {this.props.lesson.lesson_name.name}
                        <div className={classes.actions}>
                            <Button variant="contained" size="small" className={classes.button}>Edit</Button>
                            <Button variant="contained" size="small" className={classes.button} onClick={(event) => this.handleDelete(event)}>Delete</Button>
                        </div>
                </Typography>
                
            </div>
            
            </>
        )
    }
}

export default withStyles(styles)(connect()(CreateLessonItem));