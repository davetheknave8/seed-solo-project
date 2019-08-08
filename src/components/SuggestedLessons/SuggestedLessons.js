import React, {Component} from 'react';
import {connect} from 'react-redux';
import SuggestedLessonItem from '../SuggestedLessonItem/SuggestedLessonItem';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const styles = theme => ({
    card: {
        margin: '100px',
        display: 'inline-block',
        width: '200px',
        height: '200px'
    }
})

class SuggestedLessons extends Component {
    render(){
        const {classes} = this.props
        return(
            <Card className={classes.card}>
                <CardContent>
                    <Typography>Suggested Lessons:</Typography>
                    <List>
                    {this.props.reduxStore.treesReducer.map((tree, i) => <SuggestedLessonItem key={i} tree={tree} />)}
                    </List>
                </CardContent>
            </Card>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    user: reduxStore.user,
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(SuggestedLessons));