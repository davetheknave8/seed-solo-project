import React, {Component} from 'react';

import Drawer from '@material-ui/core/Drawer';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import NatureIcon from '@material-ui/icons/Nature';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

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
    }
})

class Sidebar extends Component {
    goHome = () => {
        this.props.history.push('/dashboard');
    }

    goTree = () => {
        this.props.history.push('/tree');
    }

    goSearch = () => {
        this.props.history.push('/courses');
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
                </List>
            </Drawer>
            </>
        )
    }
}

export default withStyles(styles)(Sidebar);