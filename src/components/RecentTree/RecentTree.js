import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

//Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        margin: '100px',
        display: 'inline-block',
        width: '200px',
        height: '200px'
    }
})

class RecentTree extends Component {
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_RECENT_TREE'})
    }

    render(){
        const {classes} = this.props;
        return(
            <Card className={classes.card}>
                <CardContent>
                    <Typography>Most Recent Tree:</Typography>
                    <Link to={`/tree/${this.props.reduxStore.recentTreeReducer.tree_id}`}>{this.props.reduxStore.recentTreeReducer.subject}</Link>
                </CardContent>
            </Card>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    user: reduxStore.user,
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(RecentTree));