import React, {Component} from 'react';
import {Line} from 'react-konva';

class LessonBranch extends Component{
    render(){
        let x1 = this.props.x1;
        let y1 = this.props.y1;
        let x2 = 100;
        let y2 = 100;
        let points = [x1, y1, x2, y2];

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
                        stroke={'branch'}
                        strokeWidth={20}
                 />
                </>
            )
        }
    }
}

export default LessonBranch;