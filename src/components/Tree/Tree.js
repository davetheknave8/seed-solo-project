import React, {Component} from 'react'
import { connect, ReactReduxContext, Provider } from 'react-redux';
import MainBranch from '../MainBranch/MainBranch';
import { Stage, Layer, Line } from 'react-konva';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

class Tree extends Component {
    state = {
        trunkColor: '#8B4513',
        points: [this.props.x, this.props.y1, this.props.x, this.props.y2],
        x1: this.props.x,
        y1: this.props.y1,
        x2: this.props.x,
        y2: this.props.y2,
        mainX1: 0,
        mainY1: 100,
        show: false
    }

    handleClick = e => {
        console.log(e.target);
        if (this.state.show === false) {
            this.setState({ show: true })
        } else {
            this.setState({ show: false })
        }
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CURRENT_TREE', payload: this.props.id })
    }
    render(){
        const {classes} = this.props;
        return(
            <>
              <Typography className="trunk">{this.props.reduxStore.currentTreeReducer.subject}</Typography>
              <ReactReduxContext.Consumer>
                {({ store }) => (
              <Stage draggable width={this.props.width} height={this.props.height}>
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
                    <MainBranch width={this.props.width} history={this.props.history} tree={this.props.reduxStore.currentTreeReducer} show={this.state.show} key={i} id={i} x2={this.state.x2} y2={this.state.y2} subcategory={subcategory} />
                  )}
                </Layer>
                </Provider>
              </Stage>
                )}
              </ReactReduxContext.Consumer>
        </>
        )
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(Tree));