import React, {Component, PropTypes as T } from 'react'
import AuthService from './auth-service.component.jsx'

console.log(AuthService.login)

const propTypes = {
      location: T.object,
      auth: T.instanceOf(AuthService)
    };

class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { auth } = this.props
    return (
      <div>
        <h2>Login</h2>
        <button type="button" className="btn btn-default btn-success" onClick={auth.login}>Login</button>
      </div>
    )
  }
}

export default Home
