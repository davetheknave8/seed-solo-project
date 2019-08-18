import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import UserTrees from '../UserTrees/UserTrees';
import RecentTree from '../RecentTree/RecentTree';
import SuggestedLessons from '../SuggestedLessons/SuggestedLessons';

import './Dashboard.css';

//Material-UI
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  gridTwo: {
    paddingBottom: '2vh'
  },
  requestTitle: {
    width: '70%',
    height: '20%',
    opacity: '.8',
    float: 'left',
    marginTop: '5%',
  },
  request: {
    width: '100%',
    height: '20%',
    marginTop: '5%',
    opacity: '.8'
  },
  requestBtn: {
    backgroundColor: 'rgba(223,237,214, .8)',
    width: '30%',
    height: '20%',
    float: 'right',
    marginTop: '5%',
  },
  requestTxt: {
    marginTop: '7%',
    marginLeft: '10%',
    filter: 'blur(0.5px)',
    opacity: '.7',
    fontSize: '1.1vw'
  },
  btn: {
    backgroundColor: '#243e16',
    color: 'white',
    marginTop: '5.5%',
    fontSize: '1vw'
  }, 
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    overflow: 'auto',
    height: '60%'
  },
  modal: {
    width: '100%',
    height: '100%',
    
  },
  form: {
    marginLeft: '15%',
  },
  input: {
    margin: '5%',
    width: '60%'
  },
  submitBtn: {
    marginLeft: '12%',
    marginTop: '5%',
    backgroundColor: '#243e16',
    color: 'white'
  },
  reqSub: {
    marginTop: '30%',
    marginLeft: '14%'
  },
  close: {
    marginLeft: '40%',
    marginTop: '20%'
  }
})

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Dashboard extends Component{
  state = {
    show: false,
    submitted: false,
    newRequest: {
      name: '',
      description: '',
      notes: ''
    }
  }
  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_TREES'});
    this.props.dispatch({type: 'FETCH_LESSONS'});
    this.props.dispatch({type: 'FETCH_LESSON_STATUS'});
    this.props.dispatch({type: 'FETCH_USER_REQUESTS'});

  }

  handleRequest = (event) => {
    console.log('request');
    this.setState({show: true})
  }

  handleClose = () => {
    this.setState({show: false, submitted: false})
  }

  handleChange = (event, propToChange) => {
    this.setState({newRequest: {...this.state.newRequest, [propToChange]: event.target.value}})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({newRequest: {name: '', description: '', notes: ''}, submitted: true});
    this.props.dispatch({type: 'ADD_REQUEST', payload: this.state.newRequest})
  }

  handleCloseNotify = (event) => {
    this.props.dispatch({type: 'EDIT_USER'})
  }

  render(){
    const {classes} = this.props;
    return(
      <div className="dashboard">
        
        <Grid container>
          <Grid item sm={1}>
            <Sidebar history={this.props.history} />
          </Grid>
          <Grid item sm={7}>
            <h1 className='welcome'>
              Hello, {this.props.user.username}
            </h1>
          </Grid>
          {this.props.user.admin < 3? <Grid item sm={3}>
            
              <Card className={classes.requestTitle}>
                <Typography className={classes.requestTxt}>Request to build a new tree.</Typography>
              </Card>
              <Card className={classes.requestBtn}>
                <CardActions>
                  <Button variant='contained' className={classes.btn} onClick={event => this.handleRequest(event)}>Request</Button>
                </CardActions>
              </Card>
            
          </Grid>: <> </>}
        </Grid>
        <Grid container className={classes.gridTwo}>
          <Grid item sm={2} />
          <Grid item sm={3}>
            <UserTrees history={this.props.history} />
          </Grid>
          <Grid item sm={3}>
            <RecentTree />
          </Grid>
          <Grid item sm={3}>
            <SuggestedLessons />
          </Grid>
        </Grid>
        <Modal
        open={this.state.show}
        onClose={this.handleClose}>
          {!this.state.submitted?<div style={{ top: '20%', left: '35%' }} className={classes.paper}>
            <Card className={classes.modal}>
              <CardHeader className={classes.header} title="Request to Build a New Tree"/>
              <form className={classes.form} onSubmit={event => this.handleSubmit(event)}>
                <TextField  className={classes.input} label="Tree Name" value={this.state.newRequest.name} onChange={event => this.handleChange(event, 'name')} />
                <br />
                <TextField className={classes.input} label="Tree Description" value={this.state.newRequest.description} onChange={event => this.handleChange(event, 'description')} />
                <br />
                <TextField className={classes.input} label="Notes" value={this.state.newRequest.notes} onChange={event => this.handleChange(event, 'notes')} />
                <Button type="submit" variant='contained' className={classes.submitBtn}>Submit Request</Button>
              </form>
            </Card>
          </div>: <div className={classes.paper} style={{top: '20%', left: '35%'}}><Typography className={classes.reqSub}>Your request was successfully submitted.</Typography><Button className={classes.close} onClick={this.handleClose} variant="contained">Close</Button></div>}
        </Modal>
        <Modal
        open={this.props.user.notify}
        onClose={this.handleCloseNotify}>
          <div className={classes.paper} style={{ top: '20%', left: '35%' }}>
            {this.props.user.status === 'accept' || this.props.user.status === 'deny' ? 
            <Typography>The status of your tree request(s) has been updated. Please go to the build tool for details.</Typography>
            : <></>} 
          </div>
        </Modal>
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  state
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
