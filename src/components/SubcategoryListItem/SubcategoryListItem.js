import React, {Component} from 'react';
import LessonItem from '../LessonItem/LessonItem';

import Typography from '@material-ui/core/Typography';

class SubcategoryListItem extends Component{
    render(){
        console.log(this.props.subcategory.name)
        return(
            <>
                <Typography>{this.props.subcategory.name}</Typography>
                {this.props.subcategory.lessons.map((lesson, i) => <LessonItem key={i} lesson={lesson} />)}
                <br />
            </>
        )
    }
}

export default SubcategoryListItem;