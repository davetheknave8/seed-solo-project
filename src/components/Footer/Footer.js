import React, {Component} from 'react';
import './Footer.css';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Footer extends Component{
  render(){
    return(
      <div className="bottom">
        <footer className="footer">
          <p className="name">
            &copy; David Reeves
          </p>
        </footer>
      </div>
    )
  }
};

export default Footer;
