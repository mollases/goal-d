import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService{
  constructor(clientId,domain){
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/user',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
    this.setToken = this.setToken.bind(this)
    this.getToken = this.getToken.bind(this)
    this.setActiveUser = this.setActiveUser.bind(this)
    this.getActiveUser = this.getActiveUser.bind(this)
    this.logout = this.logout.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    this.setActiveUser(authResult.idTokenPayload.sub.split('|')[1])
    // navigate to the home route
    browserHistory.replace('/user/'+this.getActiveUser())
  }

  login(){
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);

  }

  getToken(){
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  setActiveUser(activeUser){
    localStorage.setItem('active_user',activeUser)
  }

  getActiveUser(){
    // Retrieves the user token from local storage
    return localStorage.getItem('active_user')
  }

  logout(){
    // Clear user token and profile data from local storage
    localStorage.removeItem('active_user');
    localStorage.removeItem('id_token');
  }
}
