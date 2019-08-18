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
import RequestListItem from '../RequestListItem/RequestListItem';


const styles = theme => ({
    request: {
        height: '80vh',
        marginTop: '10vh'
    },
    tree: {
        height: '40vh',
        marginTop: '10vh',
        overflow: 'auto',
    },
    build: {
        height: '10vh',
        marginTop: '30vh'
    },
    treeRequest: {
        height: '80vh',
        width: '60%',
        float: 'right',
        marginTop: '10vh',
        backgroundColor: 'rgba(254, 250, 192, .69)'
    },
    data: {
        height: '80vh',
        width: '40%',
        backgroundColor: 'rgba(255, 255, 255, .69)',
        marginTop: '10vh',
        float: 'left',
        overflow: 'auto'
    },
    head: {
        backgroundColor: '#4c7a34',
        height: '20px'
    },
    titleRow: {
        backgroundColor: 'rgba(254, 250, 192, .69)',
    },
    cell: {
        fontSize: '.75em',
        
    },
    requestTable: {
        width: '100%'
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
                    
                        <Card className={classes.data}>
                            <Table className={classes.requestTable}>
                                <TableHead>
                                    <TableRow className={classes.titleRow}>
                                        <TableCell className={classes.cell}>Requests</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>                                   
                                        {this.props.reduxStore.allRequestsReducer.map(request => <RequestListItem request={request}/>)}
                                </TableBody>
                            </Table>
                        </Card>
                        <Card className={classes.treeRequest}>

                        </Card>
                    
                </Grid>
                <Grid item sm={3}>
                    <div className={classes.tree}>
                        <Table>
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <TableCell className={classes.cell}>Name</TableCell>
                                    <TableCell className={classes.cell}>Description</TableCell>
                                    <TableCell className={classes.cell}># of Users</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.reduxStore.allTreesReducer.map((tree, i) => <AdminTreeItem key={i} tree={tree}/>)}
                            </TableBody>
                        </Table>
                    </div>
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