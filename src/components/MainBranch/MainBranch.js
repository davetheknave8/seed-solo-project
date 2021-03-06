import React, {Component} from 'react';
import {connect} from 'react-redux';
import LessonBranch from '../LessonBranch/LessonBranch';

//Konva
import { Line, Text } from 'react-konva';

class MainBranch extends Component {
    state = {
        points: [this.props.x2, this.props.y2],
        branchColor: '#8B4513',
        show: false
    }

    componentDidMount = () => {
        this.getPoints();
    }

    getPoints = () => {
        const branchNum = this.props.id + 1;
        const numOfBranches = this.props.tree.subcategory.length
        console.log(numOfBranches)
        console.log(branchNum);
        const divide = this.props.width / numOfBranches;
        let x3 = divide * branchNum - 150
        console.log(x3)
        return x3;
    }
    
    render(){
        console.log(this.props.subcategory)
        let x1 = this.props.x2;
        let y1 = this.props.y2;
        let x2 = this.getPoints();
        let y2 = 100;
        let points = [x1, y1, x2, y2]
        console.log(this.state.points)
        if(this.props.show === false){
            return(
                <>

                </>
            )
        } else if (this.props.show === true) {
            return(
                <>
                <Line 
                  points={points}
                  stroke={this.state.branchColor}
                  strokeWidth={20}
                  onMouseEnter = {(event) => {
                    document.body.style.cursor = "pointer";
                      this.setState({ branchColor: '#654321', showName: true})
                                      }}
                  onMouseLeave={(event) => {
                    document.body.style.cursor = "default";
                      this.setState({ branchColor: '#8B4513', showName: false })
                    }}
                    onClick = {() => {
                        if(this.state.show === false){
                        this.setState({show: true})
                        } else{
                            this.setState({show: false})
                        }
                         
                    }}
                />
                {this.state.showName === true?<Text
                x={50}
                y={0}
                text={this.props.subcategory.name}
                fontSize={20}
                width={300}
                fill={'black'}
                />:<></>}
                {this.props.subcategory.lessons.map((lesson, i) => <LessonBranch history={this.props.history} key={i} id={i} x1={x2} y1={y2} show={this.state.show} lesson={lesson} />)}
                </>
            )
        }
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(MainBranch);