import React, {Component} from 'react';
import { connect, ReactReduxContext, Provider} from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import SubcategoryListItem from '../SubcategoryListItem/SubcategoryListItem';
import MainBranch from '../MainBranch/MainBranch';
import { Stage, Layer, Line } from 'react-konva';
import Tree from '../Tree/Tree'

//Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './TreeView.css';


const styles = theme => ({
  treePaper: {
    height: '600px',
    marginTop: '10vh',
    marginBottom: '7vh',
    marginLeft: '15vh',
    backgroundColor: '#fefac0',
    opacity: '.8',
    minWidth: 500,
  },
  lessonPaper: {
    height: '600px',
    marginTop: '10vh',
    opacity: '.8',
  },
  trunk: {
    cursor: 'pointer',
  }
})

class TreeView extends Component{
  state = {
    trunkColor: '#8B4513',
    points: [500, 600, 500, 300],
    x1: 500,
    y1: 600,
    x2: 500,
    y2: 300,
    mainX1: 0,
    mainY1: 100,
    show: false
  }

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_CURRENT_TREE', payload: this.props.match.params.id})
  }

  handleClick = e => {
    console.log(e.target);
    if(this.state.show === false){
    this.setState({show: true})
    } else{
      this.setState({ show: false })
    }
  }

  render(){
    const {classes} = this.props;
    return(
  <div className="tree">
    <Sidebar history={this.props.history} />
    <Grid container spacing = {0}>
      <Grid item lg={9}>
        <Paper className={classes.treePaper}>
          <Tree id={this.props.match.params.id} history={this.props.history} width={1000} height={565} x={500} y1={600} y2={300}/>
        </Paper>
      </Grid>
      <Grid item lg={2}>
        <Paper className={classes.lessonPaper}>
              {this.props.reduxStore.currentTreeReducer.subcategory.map((subcategory, i) => <SubcategoryListItem key={i} subcategory={subcategory}/>)}
        </Paper>
      </Grid>
    </Grid>
  </div>
    )
  }
};

const mapReduxStoreToProps = (reduxStore) => ({
  user: reduxStore.user,
  reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(TreeView));
