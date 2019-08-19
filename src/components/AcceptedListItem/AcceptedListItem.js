import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    details: {
        fontSize: '.75em',
        marginBottom: '0%'
    },
    expansionPanel: {
        width: '100%'
    },
    button: {
        display: 'inline-block',
        alignItems: 'right'
    },
    actions: {
        width: '95%',
        alignItems: 'center',
    }
})



class AcceptedListItem extends Component {
    handleDelete = (event) => {
        this.props.dispatch({ type: 'DELETE_TREE', payload: this.props.tree.id })
    }

    handleCreate = () => {
        this.props.history.push(`/create/${this.props.tree.id}`)
    }

    render(){
        const {classes} = this.props;
        return(
            <>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary>Tree Subject: {this.props.tree.subject}</ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.details}>Description: {this.props.tree.description}</Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions className={classes.actions}>
                        {this.props.tree.status !== 'review' ? <Button variant="contained" size="small" className={classes.button} onClick={this.handleCreate} color="primary">{this.props.tree.status === 'in-progress'? 'Create':'Edit'}</Button>: <Typography>Your tree is currently being reviewed.</Typography>}
                        <Button variant="contained" size="small" className={classes.button} onClick={event => this.handleDelete(event)} color="secondary">Delete</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel> 
            </>
        )
    }
}

export default withStyles(styles)(connect()(AcceptedListItem));