import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tree from '../Tree/Tree';
import Sidebar from '../Sidebar/Sidebar';
import CreateSubcategoryItem from '../CreateSubcategoryItem/CreateSubcategoryItem';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    tree: {
        marginTop: '10vh'
    },
    subcategory: {
        marginTop: '10vh'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        overflow: 'auto',
        height: '25%'
    },
    subCatForm: {
        marginTop: '5%',
        marginLeft: '10%'
    },
    nameIn: {
        width: '90%'
    },
    addSubBtn: {
        marginTop: '10%',
        marginLeft: '35%'
    }
})

class CreateView extends Component {
    state = {
        show: false,
        newSubcategory: {
            name: '', 
            treeId: this.props.match.params.id
        }
    }
    addSubcategory = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_SUBCATEGORY', payload: this.state.newSubcategory});
        this.setState({ show: false })
    }

    openModal = () => {
        this.setState({show: true});
    }

    handleChange = (event) => {
        this.setState({newSubcategory: {...this.state.newSubcategory, name: event.target.value}})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleFinish = () => {
        this.props.dispatch({type: 'FINISH_TREE', payload: this.props.match.params.id})
        this.props.history.push('/build');
    }

    render(){
        const {classes} = this.props;
        return(
            <>
            <Grid container spacing={3}>
                <Grid item sm={1}>
                    <Sidebar history={this.props.history} />
                </Grid>
                <Grid item sm={5}>
                    <div className={classes.subcategory}>
                        {this.props.reduxStore.currentTreeReducer.subcategory.map(subcategory => <CreateSubcategoryItem treeId={this.props.match.params.id} subcategory={subcategory}/>)}
                        <Button variant="contained" color="primary" onClick={this.openModal}>Add Subcategory <AddIcon /></Button>
                    </div>
                    {/* <Button onClick={() => this.handleFinish()}>Finish Tree</Button> */}
                </Grid>
                <Grid item sm={1}></Grid>
                <Grid item sm={5}>
                    <div className={classes.tree}>
                        <Tree history={this.props.history} id={this.props.match.params.id} width={500} height={500} x={250} y1={500} y2={250} />
                    </div>
                </Grid>
            </Grid>
            <Modal open={this.state.show}
            onClose={this.handleClose}
            >
            <div className={classes.paper} style={{top: '30%', left: '35%'}}>
                <form className={classes.subCatForm} onSubmit={event => this.addSubcategory(event)}>
                    <TextField className={classes.nameIn} onChange={event => this.handleChange(event)} label="Subcategory Name" />
                    <br />
                    <Button variant="contained" color="primary" className={classes.addSubBtn} type="submit">Add <AddIcon /></Button>
                </form>
            </div>
            </Modal>
            </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(CreateView));