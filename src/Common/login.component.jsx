import React, {Component} from 'react'
import AuthService from '../Services/auth-service.component.jsx'
import FlatButton from 'material-ui/FlatButton';

class Login extends Component {
  constructor(props) {
    super(props)
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(){
    if(this.props.auth.isAuthenticated()){
      this.props.auth.logout();
      location.reload();
    } else {
      this.props.auth.login();
    }
  }

  render() {
    const { auth } = this.props

    return (
      <FlatButton label={auth.isAuthenticated() ? 'logout' : 'login'} onClick={this.onClickHandler}/>
    )
  }
}

export default Login
