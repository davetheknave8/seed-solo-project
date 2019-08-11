import React, {Component} from 'react';
import {connect} from 'react-redux';
import SideBar from '../Sidebar/Sidebar';

import './LessonView.css';

//Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

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
        this.props.dispatch({type: 'FETCH_CURRENT_OBJECTIVES', payload: this.props.match.params.id})
    }
    
    render(){
        const {classes} = this.props;
        console.log(this.props.reduxStore.currentObjectivesReducer);
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
                        <Card className={classes.objectives}>
                            <CardContent>
                                <Typography>
                                    {this.props.reduxStore.currentLessonReducer.objectives}
                                </Typography>
                            </CardContent>
                        </Card>
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
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
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