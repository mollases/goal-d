import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
        userData: ''
    };
  }

  componentDidMount(){
    var self = this;
    this.props.route.data.then(response => {
      self.setState({
        userData:JSON.stringify(response)
      });
    });
  }

  render(){
    return (
      <div>
        <h1>hi: {this.state.userData}</h1>
        <p>hi: {this.props.route.magic}</p>
        </div>
      );
  }
}

export default User
