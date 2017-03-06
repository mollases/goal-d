import React, {Component} from 'react';

class Element extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let d = new Date(this.props.content.timestamp).toString();
    return(
        <div>
          <div className="row">
            <div className="col-md-9">{this.props.content.label}</div>
            <div className="col-md-3">{d}</div>
          </div>
          <p>{this.props.content.body}</p>
        </div>
    );
  }
}

export default Element
