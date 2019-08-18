import React, {Component} from 'react';
import {connect} from 'react-redux';

import Sidebar from '../Sidebar/Sidebar';
import DeniedListItem from '../DeniedListItem/DeniedListItem';
import AcceptedListItem from '../AcceptedListItem/AcceptedListItem';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class BuildView extends Component {
    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_USER_REQUESTS'});
        this.props.dispatch({type: 'FETCH_CREATOR_TREES'});
    }

    render(){
        console.log(this.props.reduxStore.userRequestsReducer.accepted)
        return(
            <>
                <Grid container>
                    <Grid item sm={1}>
                        <Sidebar history={this.props.history}/>
                    </Grid>
                    <Grid item sm={4}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Accepted Tree Requests</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.reduxStore.creatorTreesReducer ? this.props.reduxStore.creatorTreesReducer.map(tree => <AcceptedListItem tree={tree}/>):<></>}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={4}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Denied Tree Requests</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.reduxStore.userRequestsReducer.denied ? this.props.reduxStore.userRequestsReducer.denied.map(request => <DeniedListItem request={request}/>) : <></>}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(BuildView);