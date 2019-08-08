import React, {Component} from 'react';
import {connect} from 'react-redux';
import SideBar from '../Sidebar/Sidebar';

//Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({

})

class LessonView extends Component{
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_CURRENT_LESSON', payload: this.props.match.params.id})
    }
    
    render(){
        console.log(this.props.reduxStore.currentLessonReducer.name);
        return(
            <>
            <Grid container spacing={6}>
                <Grid item lg={1}>
                    <SideBar history={this.props.history} />    
                </Grid>
                <Grid item lg={9}>
                    <Card>
                        <CardContent>
                            <Typography>
                                {this.props.reduxStore.currentLessonReducer.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
            </>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(LessonView));