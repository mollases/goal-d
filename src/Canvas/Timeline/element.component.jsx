import React, {Component} from 'react';

class Element extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
        <div>
          <p className="text-right">{this.props.content.timestamp}</p>
          <p>{this.props.content.body}</p>
        </div>
    );
  }
}

export default Element
