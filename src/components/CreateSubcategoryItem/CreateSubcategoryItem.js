import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreateLessonItem from '../CreateLessonItem/CreateLessonItem';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '93%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        overflow: 'auto',
        height: '90%'
    },
    lessonForm: {
        width: '100%',
        marginLeft: '5%',
    },
    input: {
        width: '35%',
        marginRight: '10%',
        marginLeft: '3%'
    },
    body: {
        width: '90%',
        marginTop: '3%'
    },
    lessonTitle: {
        fontSize: '2.5em',
        textAlign: 'center',
        fontWeight: 'lighter'
    },
    lessonLabel: {
        fontSize: '.9em'
    },
    lessons: {
        backgroundColor: '#fefac0'
    }
})


class CreateSubcategoryItem extends Component {
    state = {
        show: false,
        newLesson: {
            name: '',
            video: '',
            body: '',
            subcategoryId: this.props.subcategory.id,
            treeId: this.props.treeId
        }
    }

    openModal = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    addLesson = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson})
    }

    handleChange = (event, propToChange) => {
        this.setState({newLesson: {...this.state.newLesson, [propToChange]: event.target.value}})
    }

    render(){
        const {classes} = this.props;
        return(
            <>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    {this.props.subcategory.name}
                </ExpansionPanelSummary>
                <div className={classes.lessons}>
                    <div className={classes.lessonLabel}>Lessons:</div>
                    {this.props.subcategory.lessons.map(lesson => <CreateLessonItem treeId={this.props.treeId} lesson={lesson} />)}
                </div>
                <ExpansionPanelActions>
                    <Button variant="contained" color="primary" onClick={this.openModal}>Add Lesson <AddIcon /></Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
            <Modal
            open={this.state.show}
            onClose={this.handleClose}>
                <div className={classes.paper} style={{top: '5%', left: '5%'}}>
                    <Typography className={classes.lessonTitle}>Create a Lesson</Typography>
                    <form className={classes.lessonForm} onSubmit={event => this.addLesson(event)}>
                        <TextField className={classes.input} label="Lesson Name" onChange={event => this.handleChange(event, 'name')} />
                        <TextField className={classes.input} label="Video URL" onChange={event => this.handleChange(event, 'video')} />
                        <br />
                        <TextField className={classes.body} multiline variant="outlined" rows="20" label="Lesson" onChange={event => this.handleChange(event, 'body')} />
                        <Button type="submit" className={classes.subLesBtn} variant="conatined" color="primary">Add Lesson</Button>
                    </form>
                </div>
            </Modal>
            </>
        )
    }
}

export default withStyles(styles)(connect()(CreateSubcategoryItem));