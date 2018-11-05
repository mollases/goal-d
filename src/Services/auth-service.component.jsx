/* global localStorage */
import auth0 from 'auth0-js'

import Config from './config.service.jsx'

export default class AuthService {
  constructor (clientID, domain) {
    // Configure Auth0
    this.lock = new auth0.WebAuth({
      clientID,
      domain,
      redirectUri: Config.getAuthCallback(),
      responseType: 'token id_token',
      scope: 'openid'
      // configurationBaseUrl: 'https://cdn.auth0.com'
    })

    this.login = this.login.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getActiveUser = this.getActiveUser.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleAuthentication (history) {
    this.lock.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.push('/user')
      } else if (err) {
        history.push('/error')
      }
    })
  }

  login () {
    // Call the show method to display the widget.
    this.lock.authorize()
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('active_user', authResult.idTokenPayload.user_id.split('|')[1]
    )
  }

  setToken (idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  getActiveUser () {
    // Retrieves the user token from local storage
    return localStorage.getItem('active_user')
  }
  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  logout (history) {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    history.push('/')
  }
}
