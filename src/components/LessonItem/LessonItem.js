import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

class LessonItem extends Component {
    render(){
        console.log(this.props.lesson.lesson_name.name)
        return(
            <>
                <Typography>{this.props.lesson.lesson_name.name}</Typography>
            </>
        )
    }
}

export default LessonItem;