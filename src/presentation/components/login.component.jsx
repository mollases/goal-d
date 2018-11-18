import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
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
      <Button onClick={this.onClickHandler} className={this.props.textClass}>{this.props.auth.isAuthenticated() ? 'logout' : 'login'}</Button>
    )
  }
}

export default withRouter(Login)
