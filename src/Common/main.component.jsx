import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import FlatLinkButton from './flatLinkButton.component.jsx'
import { Link } from 'react-router';
import Login from './login.component.jsx';


import {PropTypes as T} from 'prop-types'
import AuthService from '../Services/auth-service.component.jsx'

const propTypes = {
      location: T.object,
      auth: T.instanceOf(AuthService)
    };

class Main extends Component {
constructor(props) {
    super(props)
    injectTapEventPlugin();
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    var user = '';
    if(this.props.route.auth.loggedIn()) {
        user = (<Link to={'/user/' + this.props.route.auth.getActiveUser()} activeClassName="active">
            <FlatButton label="user"/>
        </Link>)
    }
    return (
      <div>
        <AppBar
          title={
            <Link to="/">Goal-d</Link>
          }
          showMenuIconButton={false}
          iconElementRight={
            <span>
                {user}
                <Login auth={this.props.route.auth}/>
                <Link to="/about">
                    <FlatButton label="about"/>
                </Link>
            </span>}
        />

        <div className="row">
            <div className="container col-md-offset-2 col-md-8">
                {children}
            </div>
        </div>
      </div>
    );
  }
}

export default Main;
