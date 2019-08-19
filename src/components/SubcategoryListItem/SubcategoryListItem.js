import React, {Component} from 'react';
import LessonItem from '../LessonItem/LessonItem';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    subCat: {
        fontSize: '1.25em',
        textDecoration: 'underline',
        fontWeight: 'bold',
        marginBottom: '1vh',
        textAlign: 'center'
    }
})

class SubcategoryListItem extends Component{
    render(){
        const {classes} = this.props;
        console.log(this.props.subcategory.name)
        return(
            <>
                <Typography className={classes.subCat}>{this.props.subcategory.name}</Typography>
                {this.props.subcategory.lessons.map((lesson, i) => <LessonItem history={this.props.history} key={i} lesson={lesson} />)}
                <br />
            </>
        )
    }
}

export default withStyles(styles)(SubcategoryListItem);