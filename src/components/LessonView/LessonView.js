import React, {Component} from 'react';
import {connect} from 'react-redux';
import SideBar from '../Sidebar/Sidebar';
import ObjectiveListItem from '../ObjectiveListItem/ObjectiveListItem';

import './LessonView.css';

//Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    text: {
        minHeight: '600px'
    },
    objectives: {
        minHeight: '50px'
    },
    questions: {
        minHeight: '200px'
    },
    title: {
        backgroundColor: '#fefac0',
        marginTop: '10px',
        padding: '10px',
        textAlign: 'center',
        opacity: '.77'
    },
    video: {
        minHeight: '600px'
    }
})

class LessonView extends Component{
    componentDidMount = () => {
        document.body.style.cursor = "default";
        this.props.dispatch({type: 'FETCH_CURRENT_LESSON', payload: this.props.match.params.id});
        this.props.dispatch({type: 'FETCH_CURRENT_OBJECTIVES', payload: this.props.match.params.id});
        this.props.dispatch({ type: 'FETCH_FINISHED_OBJECTIVES', payload: { user_id: this.props.reduxStore.user.id, lesson_id: this.props.match.params.id } })
    }

    handleFinish = (event) => {
        this.props.dispatch({type: 'ADD_COMPLETED_LESSON', payload: {lesson_id: this.props.match.params.id, tree_id: this.props.reduxStore.recentTreeReducer.tree_id}})
        this.props.history.push(`/tree/${this.props.reduxStore.recentTreeReducer.tree_id}`)
    }
    
    render(){
        const {classes} = this.props;
        return(
            <div className='lesson'>
                <Grid container spacing={6}>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={10}>
                        <header className={classes.title}>{this.props.reduxStore.currentLessonReducer.name}</header>
                    </Grid>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={10}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Objectives</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                               <FormGroup>
                                    {this.props.reduxStore.currentObjectivesReducer.map((objective, i) => <ObjectiveListItem key={i} objective={objective} lesson_id={this.props.match.params.id} />)}
                                </FormGroup>                                
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                {this.props.reduxStore.currentObjectivesReducer.length === this.props.reduxStore.objectiveStatusReducer.length
                                    ?
                                    <>
                                    <Typography>Finished with this lesson?</Typography>
                                    <Button variant="contained" color="primary" onClick={event => this.handleFinish(event)}>Finish Lesson</Button>
                                    </>
                                    :
                                    <></>}
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item sm={1}></Grid>
                    
                    <Grid item sm={1}>
                        <SideBar history={this.props.history} />    
                    </Grid>
                    <Grid item sm={7}>
                        <Card className={classes.text}>
                            <CardContent>
                                <Typography>
                                    {this.props.reduxStore.currentLessonReducer.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={3}>
                        <Card className={classes.video}>
                            <CardContent>
                                {this.props.reduxStore.currentLessonReducer.video?<iframe width="300" height="180" 
                                    src={this.props.reduxStore.currentLessonReducer.video} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                    </iframe>:<></>}
                            </CardContent>
                            <hr />
                            <CardContent>
                                {this.props.reduxStore.currentLessonReducer.questions}
                            </CardContent>
                            
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(LessonView));