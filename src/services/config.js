/* global fetch */
class Config {
  constructor () {
    this.url = window.location.origin
    this.api = this.url
    if (this.url.indexOf('localhost') === -1) {
      this.api = 'https://a6m0dse1xk.execute-api.us-west-2.amazonaws.com/dev'
    }
  }

  getAuthCallback () {
    return this.url + '/callback'
  }

  getUserDetails (user) {
    return fetch(this.api + '/user-details/' + user)
  }

  postUserDetails (user, body, callback) {
    return fetch(this.api + '/user-details/' + user, this.getHeadersWithBody(body))
  }

  getUserTopic (user, topic) {
    return fetch(this.api + '/user-details/' + user + '/topic/' + topic)
  }

  postUserTopic (user, topic, body) {
    return fetch(this.api + '/user-details/' + user + '/topic/' + topic, this.getHeadersWithBody(body))
  }

  getUserTopicPostList (user, topic, post, postList) {
    return fetch(this.api + '/user-details/' + user + '/topic/' + topic + '/posts/' + postList)
  }

  postUserTopicOnPost (user, topic, post, body) {
    return fetch(this.api + '/user-details/' + user + '/topic/' + topic + '/post/' + post, this.getHeadersWithBody(body))
  }

  getHeadersWithBody (body) {
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    }
  }
}

export default new Config()
