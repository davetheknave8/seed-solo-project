import React, {Component} from 'react';
import { connect, ReactReduxContext, Provider} from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import SubcategoryListItem from '../SubcategoryListItem/SubcategoryListItem';
import MainBranch from '../MainBranch/MainBranch';
import { Stage, Layer, Line } from 'react-konva';

//Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './TreeView.css';


const styles = theme => ({
  treePaper: {
    height: '800px',
    marginTop: '50px',
    marginBottom: '10px',
    marginLeft: '75px',
    backgroundColor: '#fefac0',
    opacity: '.8',
    minWidth: 500,
    minHeight: 800
  },
  lessonPaper: {
    height: '800px',
    marginTop: '50px',
    opacity: '.8'
  },
  trunk: {
    cursor: 'pointer',
  }
})

class TreeView extends Component{
  state = {
    trunkColor: '#8B4513',
    points: [500, 775, 500, 450],
    x1: 500,
    y1: 775,
    x2: 500,
    y2: 450,
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
              <Typography className="trunk">Tree {this.props.match.params.id}</Typography>
              <ReactReduxContext.Consumer>
                {({ store }) => (
              <Stage draggable width={1000} height={775}>
                <Provider store={store}>
                <Layer>
                  <Line
                  className={"trunk"}
                  points={this.state.points}
                  stroke={this.state.trunkColor}
                  strokeWidth={30}
                  onClick={event => this.handleClick(event)}
                  onMouseEnter = {(event) => {
                    document.body.style.cursor = "pointer";
                    this.setState({ trunkColor: '#654321'})
                                      }}
                  onMouseLeave={(event) => {
                    document.body.style.cursor = "default";
                    this.setState({ trunkColor: '#8B4513' })
                    }}
                   />
                  {this.props.reduxStore.currentTreeReducer.subcategory.map((subcategory, i) =>
                    <MainBranch history={this.props.history} tree={this.props.reduxStore.currentTreeReducer} show={this.state.show} key={i} id={i} x2={this.state.x2} y2={this.state.y2} subcategory={subcategory} />
                  )}
                </Layer>
                </Provider>
              </Stage>
                )}
              </ReactReduxContext.Consumer>
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
