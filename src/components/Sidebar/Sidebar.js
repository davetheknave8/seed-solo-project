import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

import './Sidebar.css';

import Drawer from '@material-ui/core/Drawer';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import NatureIcon from '@material-ui/icons/Nature';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import VerifiedIcon from '@material-ui/icons/VerifiedUser';

const styles = theme => ({
    drawer: {
        width: '40px',
        backgroundColor: '#4c7a34'
    },
    drawerPaper: {
        backgroundColor: '#4c7a34',
        width: '40px'
    },
    icons: {
        justifyContent: 'center'
    },
    logout: {
        justifyContent: 'center',
        marginLeft: '17px'
    }
})

class Sidebar extends Component {
    goHome = () => {
        this.props.history.push('/dashboard');
    }

    goTree = () => {
        this.props.history.push(`/tree/${this.props.reduxStore.recentTreeReducer.tree_id}`);
    }

    goSearch = () => {
        this.props.history.push('/courses');
    }

    handleAdmin = (event) => {
        this.props.history.push('/admin')
    }

    render(){
        const {classes} = this.props;
        return(
            <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <List>
                    <ListItem className={classes.icons}>
                            <Button onClick={this.goHome}><ListItemIcon className={classes.icons}><HomeIcon /></ListItemIcon></Button>
                    </ListItem>
                    <ListItem className={classes.icons}>
                            <Button onClick={this.goTree}><ListItemIcon className={classes.icons}><NatureIcon /></ListItemIcon></Button>
                    </ListItem>
                    <ListItem className={classes.icons}>
                            <Button onClick={this.goSearch}><ListItemIcon className={classes.icons}><SearchIcon /></ListItemIcon></Button>
                    </ListItem>
                    {this.props.reduxStore.user.admin === 3 ?
                    <ListItem className={classes.logout}>
                        <Button onClick={event => this.handleAdmin(event)}><ListItemIcon><VerifiedIcon className={classes.icons} /></ListItemIcon></Button>
                    </ListItem>:<></>}
                    <ListItem className={classes.logout}>
                            <LogOutButton history={this.props.history} sidebar='yes'/>
                    </ListItem>
                    
                </List>
            </Drawer>
            </>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(withStyles(styles)(Sidebar));