import React, {Component} from 'react';

class MainBranch extends Component {
    render(){
        console.log(this.props.id)
        if(this.props.show === false){
            return(
                <>

                </>
            )
        } else if (this.props.show ===true) {
            return(
                <>
                {this.props.subcategory.name}
                </>
            )
        }
    }
}

export default MainBranch;