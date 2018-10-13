'use strict'

const rp = require('request-promise')

const callRemoteDDB = async (url, body) => {
  var options = {
    url: url,
    method: 'get',
    json: true
  }

  if (body) {
    options.method = 'post'
    options.body = body
  }

  console.log('rddb request', options)
  let resp
  try {
    resp = await rp(options)
  } catch (e) {
    console.error('error with request', options, e)
    throw e
  }
  return resp
}

class RemoteDynamoDB {
  constructor (hostname, env) {
    this.hostname = hostname
    this.env = env
    this.type = 'RemoteDynamoDB'
  }

  log (msg) {
    console.log(msg)
  }

  async getUserDetails (user) {
    var path = '/user-details/' + user
    console.log(path)
    let response = await callRemoteDDB(this.hostname + this.env + path)
    return response
  }

  async postUserDetails (user, body) {
    var path = '/user-details/' + user
    var content = body
    let response = await callRemoteDDB(this.hostname + this.env + path, content)
    return response
  }

  async getUserTopic (user, topic) {
    var path = '/user-details/' + user + '/topic/' + topic
    let response = await callRemoteDDB(this.hostname + this.env + path)
    return response
  }

  async postUserTopic (user, topic, body) {
    var path = '/user-details/' + user + '/topic/' + topic
    var content = body
    let response = await callRemoteDDB(this.hostname + this.env + path, content)
    return response
  }

  async postUserTopicPost (user, topic, post, body) {
    var path = '/user-details/' + user + '/topic/' + topic + '/post/' + post
    var content = body
    let response = await callRemoteDDB(this.hostname + this.env + path, content)
    return response
  }

  async getUserTopicPosts (user, topic, postList) {
    var path = '/user-details/' + user + '/topic/' + topic + '/posts/' + postList
    let response = await callRemoteDDB(this.hostname + this.env + path)
    return response
  }
}

module.exports = RemoteDynamoDB
