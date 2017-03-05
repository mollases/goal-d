import React, {Component} from 'react';

class Element extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let d = new Date(this.props.content.timestamp).toString();
    return(
        <div>
          <p className="text-right">{d}</p>
          <p>{this.props.content.body}</p>
        </div>
    );
  }
}

export default Element
