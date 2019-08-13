import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Admin.css';

import Sidebar from '../Sidebar/Sidebar';
import AdminTreeItem from '../AdminTreeItem/AdminTreeItem';

//Material-UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';


const styles = theme => ({
    request: {
        height: '80vh',
        marginTop: '10vh'
    },
    tree: {
        height: '20vh',
        marginTop: '10vh'
    },
    build: {
        height: '10vh',
        marginTop: '30vh'
    },
    treeRequest: {
        height: '80vh',
        width: '75%'
    },
    data: {
        height: '80vh',
        width: '25%',
        backgroundColor: 'green'
    },
    head: {
        backgroundColor: '#4c7a34'
    }
})


class Admin extends Component {
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_ALL_TREES'});
        this.props.dispatch({type: 'FETCH_ALL_REQUESTS'});
    }

    render(){
        console.log(this.props.reduxStore.allUserTreesReducer);
        const {classes} = this.props;
        if(this.props.reduxStore.user.admin === 3)
        return(
            <div className="admin">
            <Grid container spacing={6}>
                <Grid item sm={1}>
                    <Sidebar history={this.props.history} />
                </Grid>
                <Grid item sm={7}>
                    <Card className={classes.request}>
                        <Card className={classes.data}>

                        </Card>
                        <Card className={classes.treeRequest}>

                        </Card>
                    </Card>
                </Grid>
                <Grid item sm={3}>
                    <Table className={classes.tree}>
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell># of Users</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxStore.allTreesReducer.map((tree, i) => <AdminTreeItem key={i} tree={tree}/>)}
                        </TableBody>
                    </Table>
                    <Card className={classes.build}>

                    </Card>
                </Grid>
            </Grid>
            </div>
        )
        else{
            return(
            <>
            <p>You do not have the permission to access this page.</p>
            </>
            )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(Admin));