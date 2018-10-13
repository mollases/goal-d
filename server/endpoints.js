'use strict'

class Endpoints {
  constructor (client) {
    this.client = client
  }

  async getUserDetails (request, response) {
    console.log('getUserDetails', request.params.id)
    let result
    try {
      result = await this.client.getUserDetails(request.params.id)
      console.log('response getUserDetails', result)
    } catch (e) {
      result = e
    }
    response.json(result)
  }

  async postUserDetails (request, response) {
    console.log('postUserDetails', JSON.stringify(request.body))
    let result
    try {
      result = await this.client.postUserDetails(request.params.id, request.body)
      console.log('response postUserDetails', JSON.stringify(result))
    } catch (e) {
      result = e
      console.log('err postUserDetails', JSON.stringify(e))
    }
    response.json(result)
  }

  async getUserTopic (request, response) {
    console.log('getUserTopic', request.body)
    let result
    try {
      result = await this.client.getUserTopic(request.params.id, request.params.topic)
      console.log('response getUserTopic', result)
    } catch (e) {
      result = e
    }
    response.json(result)
  }

  async postUserTopic (request, response) {
    console.log('postUserTopic', request.body)
    let result
    try {
      result = await this.client.postUserTopic(request.params.id, request.params.topic, request.body)
      console.log('response postUserTopic', result)
    } catch (e) {
      result = e
    }
    response.json(result)
  }

  async getUserTopicPosts (request, response) {
    console.log('getUserTopicPosts', request.body)
    let all = request.params.posts.split(',')
    let result
    try {
      result = await this.client.getUserTopicPosts(request.params.id, request.params.topic, all)
      console.log('response getUserTopicPosts', result)
    } catch (e) {
      result = e
    }
    response.json(result)
  }

  async postUserTopicPost (request, response) {
    console.log('postUserTopicPost', request.body)
    let content = request.body
    content.timestamp = +new Date()
    let result
    try {
      result = await this.client.postUserTopicPost(request.params.id, request.params.topic, request.params.post, content)
      console.log('response postUserTopicPost', result)
    } catch (e) {
      result = e
    }
    response.json(result)
  }
}

module.exports = Endpoints
