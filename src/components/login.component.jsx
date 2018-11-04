import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import autoBind from 'react-autobind'

class Login extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  onClickHandler () {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.logout(this.props.history)
    } else {
      this.props.auth.login()
    }
  }

  render () {
    const { auth } = this.props

    return (
      <FlatButton label={auth.isAuthenticated() ? 'logout' : 'login'} onClick={this.onClickHandler} />
    )
  }
}

export default Login
