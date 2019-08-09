import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserTreeItem from '../UserTreeItem/UserTreeItem';

import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
    card: {
        margin: '100px',
        marginTop: '20px',
        display: 'inline-block',
        width: '300px',
        height: '350px'
    }
})

class UserTrees extends Component {

    render(){
        const {classes} = this.props
        return(
            <Card className={classes.card}>
                <CardContent>
                    <Typography>Your Trees: </Typography>
                    {this.props.reduxStore.treesReducer.map((tree, i) => <UserTreeItem tree={tree} key={i}></UserTreeItem>)}
                </CardContent>
            </Card>
            
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    user: reduxStore.user,
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(UserTrees));