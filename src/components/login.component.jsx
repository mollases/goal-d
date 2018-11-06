import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
    return (
      <FlatButton label={this.props.auth.isAuthenticated() ? 'logout' : 'login'} onClick={this.onClickHandler} />
    )
  }
}

export default withRouter(Login)
