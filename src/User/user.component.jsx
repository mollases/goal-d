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
  }

  render(){
    return (
      <div>
        <h1>hi</h1>
        </div>
      );
  }
}

export default User
