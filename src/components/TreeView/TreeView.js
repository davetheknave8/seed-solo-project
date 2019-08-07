import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import SubcategoryItem from '../SubcategoryItem/SubcategoryItem';

//Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  treePaper: {
  },
  lessonPaper: {
  }
})

class TreeView extends Component{
  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_CURRENT_TREE', payload: this.props.match.params.id})
  }

  render(){
    const {classes} = this.props;
    console.log(this.props.reduxStore.currentTreeReducer);
    return(
  <div className="tree">
    <Sidebar history={this.props.history} />
    <Grid container spacing = {2}>
      <Grid item lg={7}>
        <Paper className={classes.treePaper}>
              <Typography>Tree {this.props.match.params.id}</Typography>
        </Paper>
      </Grid>
      <Grid lg={4}>
        <Paper className={classes.lessonPaper}>
          {this.props.reduxStore.currentTreeReducer.map((subcategory, i) => <SubcategoryItem />)}
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
