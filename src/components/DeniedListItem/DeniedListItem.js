import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        overflow: 'auto',
        height: '45%'
    },
    editForm: {
        marginLeft: '10%',
        marginTop: '5%'
    },
    editIn: {
        width: '90%',
        marginBottom: '5%'
    },
    submitEdit: {
        marginLeft: '27%'
    }
})

class DeniedListItem extends Component {
    state = {
        open: false,
        editRequest: {
            id: this.props.request.id,
            tree_name: this.props.request.tree_name,
            description: this.props.request.description,
            notes: ''
        }
    }
    handleDelete = (event) => {
        this.props.dispatch({type: 'DELETE_REQUEST', payload: this.props.request.id})
    }

    showModal = (event) => {
        this.setState({open: true})
    }   

    handleClose = () => {
        this.setState({open: false })
    }

    handleChange = (event, propToChange) => {
        this.setState({editRequest: {...this.state.editRequest, [propToChange]: event.target.value}})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.dispatch({type: 'EDIT_REQUEST', payload: this.state.editRequest})
        this.handleClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <ExpansionPanel className={classes.expansionPanel}>
                   <ExpansionPanelSummary>Tree Subject: {this.props.request.tree_name}</ExpansionPanelSummary>
                   <ExpansionPanelDetails>
                        <Typography className={classes.details}>Description: {this.props.request.description}</Typography>
                   </ExpansionPanelDetails>
                   <ExpansionPanelDetails>
                        <Typography className={classes.details}>Admin notes: {this.props.request.notes}</Typography>
                   </ExpansionPanelDetails>
                    <ExpansionPanelActions className={classes.actions}>
                        <Button variant="contained" size="small" className={classes.button} color="primary" onClick={event => this.showModal(event)}>Edit</Button>
                        <Button variant="contained" size="small" className={classes.button} color="secondary" onClick={event => this.handleDelete(event)}>Delete</Button>
                   </ExpansionPanelActions>                   
                </ExpansionPanel> 
                <Modal
                onClose={this.handleClose}
                open={this.state.open}>
                    <div className={classes.paper} style={{ top: '20%', left: '35%' }}>
                        <form onSubmit={event => this.handleSubmit(event)} className={classes.editForm}>
                            <Typography>Edit Your Request</Typography>
                            <br />
                            <TextField className={classes.editIn} label="Subject" onChange={event => this.handleChange(event, 'tree_name')} value={this.state.editRequest.tree_name} />
                            <br />
                            <TextField className={classes.editIn} label="Description" onChange={event => this.handleChange(event, 'description')} value={this.state.editRequest.description} />
                            <br />
                            <TextField className={classes.editIn} label="Notes" value={this.state.editRequest.name} onChange={event => this.handleChange(event, 'notes')} />
                            <br />
                            <Button className={classes.submitEdit} variant="contained" color="primary" type="submit">Submit Edit</Button>
                        </form>

                    </div>
                </Modal>
            </>
        )
    }
}

export default withStyles(styles)(connect()(DeniedListItem));