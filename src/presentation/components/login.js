import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autoBind from 'react-autobind'

import Button from '@material-ui/core/Button'

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
      <Button onClick={this.onClickHandler} className={this.props.textClass}>{this.props.auth.isAuthenticated() ? 'logout' : 'login / signup'}</Button>
    )
  }
}

export default withRouter(Login)
