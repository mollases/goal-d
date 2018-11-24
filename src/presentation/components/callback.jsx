import React, { Component } from 'react'
import autoBind from 'react-autobind'

export default class Callback extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.handleAuthentication(this.props.location)
  }

  handleAuthentication (location) {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.props.auth.handleAuthentication(this.props.history)
    }
  }

  render () {
    return (<h1>Something went wrong logging you in, dont worry, I'm on it.</h1>)
  }
}
