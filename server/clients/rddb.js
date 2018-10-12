'use strict'

const rp = require('request-promise')

async function callRemoteDDB (url, body) {
  var options = {
    url: url,
    method: 'get'
  }

  if (body) {
    options.method = 'post'
    options.body = body
    options.json = true
  }

  let resp
  try {
    resp = await rp(options)
  } catch (e) {
    console.error('error posting json: ', e)
    throw e
  }
  console.log(resp)
  return resp.body
  //  function (err, res, body) {
  //   var headers = res.headers
  //   var statusCode = res.statusCode
  //   console.log('headers: ', headers)
  //   console.log('statusCode: ', statusCode)
  //   console.log('body: ', body)
  // }
}

class RemoteDynamoDB {
  constructor (hostname, env) {
    this.hostname = hostname
    this.env = env
    this.type = 'RemoteDynamoDB'
  }

  async getUserDetails (user) {
    var path = '/user-details/' + user
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
