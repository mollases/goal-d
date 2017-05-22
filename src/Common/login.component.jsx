import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import AuthService from '../Services/auth-service.component.jsx'
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
      location: T.object,
      auth: T.instanceOf(AuthService)
    };

class Login extends Component {
  constructor(props) {
    super(props)
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(){
    if(this.props.auth.loggedIn()){
      this.props.auth.logout();
      location.reload();
    } else {
      this.props.auth.login();
    }
  }

  render() {
    const { auth } = this.props

    return (
      <FlatButton label={auth.loggedIn() ? 'logout' : 'login'} onClick={this.onClickHandler}/>
    )
  }
}

export default Login
