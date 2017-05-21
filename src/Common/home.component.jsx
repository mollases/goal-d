import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import AuthService from '../Services/auth-service.component.jsx'
import FlatButton from 'material-ui/FlatButton';

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
      <FlatButton label={auth.loggedIn() ? 'logout' : 'login'} onClick={() => {return auth.loggedIn() ? auth.logout() : auth.login()}}/>
    )
  }
}

export default Home
