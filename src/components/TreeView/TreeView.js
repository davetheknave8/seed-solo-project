import React, {Component} from 'react';
import Sidebar from '../Sidebar/Sidebar';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class TreeView extends Component{
  render(){
    return(
  <div className="tree">
    <p>
      Info Page
    </p>
    <Sidebar history={this.props.history} />
  </div>
    )
  }
};

export default TreeView;
