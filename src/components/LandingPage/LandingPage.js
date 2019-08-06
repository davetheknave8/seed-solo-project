import React, {Component} from 'react';
import Nav from '../Nav/Nav';


class LandingPage extends Component{
    render(){
        return(
            <>
            <Nav history={this.props.history}/>
            </>
        )
    }
}

export default LandingPage;