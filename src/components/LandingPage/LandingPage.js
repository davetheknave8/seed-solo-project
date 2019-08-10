import React, {Component} from 'react';
import Nav from '../Nav/Nav';

import './LandingPage.css';


class LandingPage extends Component{
    render(){
        return(
            <div className="landing">
                <Nav history={this.props.history}/>
                <header>
                    <h1 className='landing-title'>Seed.</h1>
                </header>
            </div>
        )
    }
}

export default LandingPage;