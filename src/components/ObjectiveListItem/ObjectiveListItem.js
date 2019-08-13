import React, {Component} from 'react';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    complete: {
        textDecoration: 'line-through'
    }
})

class ObjectiveListItem extends Component {
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_FINISHED_OBJECTIVES', payload: { user_id: this.props.reduxStore.user.id, lesson_id: this.props.lesson_id } })
    }

    handleComplete = (event) => {
        this.props.dispatch({ type: 'ADD_COMPLETED_OBJECTIVE', payload: { user_id: this.props.reduxStore.user.id, lesson_id: this.props.lesson_id, objective_id: this.props.objective.objectives_id }})
    }

    handleUncomplete = (event) => {
        this.props.dispatch({type: 'DELETE_COMPLETED_OBJECTIVE', payload: { user_id: this.props.reduxStore.user.id, lesson_id: this.props.lesson_id, objective_id: this.props.objective.objectives_id}})
    }

    render(){
        const {classes}=this.props;
        let complete = false;
        for (let currentObjective of this.props.reduxStore.objectiveStatusReducer){
            if(this.props.objective.objectives_id === currentObjective.objective_id){
                complete = true;
            }
        }
        console.log(complete);
        return(
            <>
                {complete===false?
                <FormControlLabel
                control={
                    <Checkbox checked={false}
                    onChange={event => this.handleComplete(event)} />
                }
                label={this.props.objective.name} />
            :
                <>
                {!this.props.completed ? 
                    <FormControlLabel
                    control={
                        <Checkbox checked={true}
                        onChange={event => this.handleUncomplete(event)} />                
                    }
                    label={this.props.objective.name} />
                :
                    <FormControlLabel
                    control={
                        <Checkbox checked={true}
                        disabled
                         />                
                    }
                    label={this.props.objective.name} />   
                 }</>}
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(ObjectiveListItem));