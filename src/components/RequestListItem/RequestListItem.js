import React, {Component} from 'react';
import {connect} from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    cell: {
        fontSize: '.5em'
    },
    description: {
        fontSize: '.5em',
        textAlign: 'left',
        justifyContent: 'left'
    },
    notes: {
        fontSize: '.5em',
        textAlign: 'right',
        justifyContent: 'right'
    },
    panel: {
        height: '30%',
        fontSize: '.5em',
    },
    details: {
        backgroundColor: 'rgba(254, 250, 192, .69)'
    }, 
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        overflow: 'auto',
        height: '30%'
    },
    form: {
        marginLeft: '10%',
        marginTop: '5%'
    },
    editBtn: {
        marginTop: '10%',
        marginLeft: '35%'
    },
    editNotes: {
        width: '90%'
    }
})

class RequestListItem extends Component {
    state = {
        expanded: false,
        show: false,
        notes: ''
    }
    handleDecision = (event, status) => {
        this.props.dispatch({type: 'EDIT_REQUEST_STATUS', payload: {request_id: this.props.request.id, status: status, user_id: this.props.request.user_id, notes: this.state.notes}})
        this.setState({expanded: false, show: false})
    }

    handleAccept = (event) => {
        this.props.dispatch({type: 'CREATE_TREE', payload: this.props.request})
        this.props.dispatch({type: 'DELETE_REQUEST', payload: this.props.request.id})
    }

    handleExpand = () => {
        this.setState({expanded: !this.state.expanded})
    }

    openModal = (event) => {
        this.setState({show: true})
    }

    handleClose =  () => {
        this.setState({show: false})
    }

    handleChange = (event) => {
        this.setState({notes: event.target.value})
    }
    
    render(){
        const {classes} = this.props;
        console.log(this.props.request);
        return(
            <>
                
                {this.props.request.status === 'not viewed' ? <ExpansionPanel onClick={this.handleExpand} expanded={this.state.expanded} className={classes.panel}>
                    <ExpansionPanelSummary>
                        <TableRow>
                            <Typography className={classes.cell}>Name: {this.props.request.tree_name}</Typography>
                            <br />
                            <Typography className={classes.cell}>Date Requested: {this.props.request.date_submitted}</Typography>
                        </TableRow>           
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <Typography className={classes.description}>Description: {this.props.request.description}</Typography>
                        <br />
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails className={classes.details}>
                        <Typography className={classes.notes}>Notes: {this.props.request.notes}</Typography>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button variant="contained" color="primary" className={classes.btn} onClick={event => this.handleAccept(event)}>Accept</Button>
                        <Button variant="contained" color="secondary" onClick={event => this.openModal(event)}>Deny</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>:<></>}
                <Modal open={this.state.show}
                onClose={this.handleClose}
                >
                    <div className={classes.paper} style={{top: '30%', left: '35%'}}>
                        <form className={classes.form} onSubmit={event => this.handleDecision(event)}>
                            <Typography>Why are you denying this request?</Typography>
                            <br />
                            <TextField className={classes.editNotes} label="Reason" onChange={event => this.handleChange(event)} />
                            <br />
                            <Button className={classes.editBtn} type="submit" variant="contained" color="secondary">Deny</Button>
                        </form>
                    </div>
                </Modal>

            </>
        )
    }
}

export default withStyles(styles)(connect()(RequestListItem));