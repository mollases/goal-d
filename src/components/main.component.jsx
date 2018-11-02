import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
// import FlatLinkButton from './flatLinkButton.component.jsx'
import { Link } from 'react-router'
import Login from './login.component.jsx'

class Main extends Component {
  constructor (props) {
    super(props)
    injectTapEventPlugin()
  }

  render () {
    let children = null
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth // sends auth instance from route to children
      })
    }

    var user = ''
    if (this.props.route.auth.isAuthenticated()) {
      user = (<Link to={'/user'} activeClassName='active'>
        <FlatButton label='user' />
      </Link>)
    }
    return (
      <div>
        <AppBar
          title={
            <Link to='/'>Goal-d</Link>
          }
          showMenuIconButton={false}
          iconElementRight={
            <span>
              {user}
              <Login auth={this.props.route.auth} />
              <Link to='/about'>
                <FlatButton label='about' />
              </Link>
            </span>}
        />

        <div className='row'>
          <div className='container col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Main
