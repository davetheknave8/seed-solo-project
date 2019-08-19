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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    },
    create: {
        width: '70%',
        height: '10vh',
        backgroundColor: 'rgba(254, 250, 192, .65)',
        float: 'left',
        marginTop: '30vh'
    },
    createBtnContainer: {
        width: '30%',
        height: '10vh',
        backgroundColor: 'rgba(223,237,214,.77)',
        float: 'right',
        marginTop: '30vh',

    },
    createBtn: {
        backgroundColor: '#4c7a34',
        color: 'white',
        marginTop: '20%',
        marginLeft: '15%'
    },
    createTitle: {
        marginTop: '8%',
        fontSize: '1.5em',
        filter: 'blur(.75px)',
        marginLeft: '3%'
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
                    
                    <Card className={classes.create}>
                        <Typography className={classes.createTitle}>Create a New Tree.</Typography>
                    </Card>
                    <Card className={classes.createBtnContainer}>
                        <Button variant="contained" size="small" className={classes.createBtn}>Create</Button>
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