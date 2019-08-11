import React, {Component} from 'react';
import {Line, Text} from 'react-konva';

class LessonBranch extends Component{
    state = {
        lessonColor: '#8B4513'
    }

    render(){
        let x1 = this.props.x1;
        console.log(x1);
        let y1 = this.props.y1;
        let x2 = 0
        if((this.props.id + 1) > 2){
            x2 = x1 + ((this.props.id) * 30)
        } else if (this.props.id === 0){
            x2 = this.props.x1 - 60
        } else if (this.props.id === 1){
            x2 = x1
        }
        console.log(x2)
        let y2 = 0;
        let points = [x1, y1, x2, y2];
        console.log(points);
        if(this.props.show === false){
            return(
                <>
                </>
            )
        } else if (this.props.show === true){
            return(
                <>
                <Line
                        points={points}
                        stroke={this.state.lessonColor}
                        strokeWidth={10}
                        onMouseEnter={(event) => {
                            document.body.style.cursor = "pointer";
                            this.setState({ lessonColor: '#654321', showLesson: true })
                        }}
                        onMouseLeave={(event) => {
                            document.body.style.cursor = "default";
                            this.setState({ lessonColor: '#8B4513', showLesson: false })
                        }}
                        onClick={event => {
                            this.props.history.push(`/lesson/${this.props.lesson.id}`)
                        }}
                 />
                    {this.state.showLesson === true ? <Text
                        x={(x1 - 150)}
                        y={50}
                        text={this.props.lesson.lesson_name.name}
                        fontSize={20}
                        width={300}
                        fill={'black'}
                    /> : <></>}
                </>
            )
        }
    }
}

export default LessonBranch;