import React, {Component} from 'react';
import { Link } from 'react-router';

import AddElement from './add-element.component.jsx'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count : 0
    }
    this.callRefresh = this.callRefresh.bind(this)
  }

  callRefresh(){
    let counter = this.state.count+1
    this.setState({count:counter})
    console.log(this.state.count)
  }

    render(){
      return(
        <div>
          <p>{this.state.count}</p>
          <AddElement onSubmitPressed={this.callRefresh}/>
        </div>
      );
    }
}

export default Timeline
