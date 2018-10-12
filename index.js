'use strict'
const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const Endpoints = require('./server/endpoints.js')
const RemoteDynamoDB = require('./server/clients/rddb.js')
const bodyParser = require('body-parser')
const hostname = 'https://zpdg9c0o8j.execute-api.us-west-2.amazonaws.com/'
const env = 'dev/'

class GoalDServer {
  constructor (express, port, users, endpoints) {
    this.app = express()
    this.port = port
    this.endpoints = endpoints
    for (let i = 0; i < users.length; i++) {
      this.app.use(users[i])
    }
  }

  start () {
    this.app.listen(this.port)
    console.log('server started on port', this.port)
  }

  routes () {
    this.app.get('/user-details/:id', this.endpoints.getUserDetails)
    this.app.get('/user-details/:id/topic/:topic', this.endpoints.getUserTopic)
    this.app.get('/user-details/:id/topic/:topic/posts/:posts', this.endpoints.getUserTopicPosts)
    this.app.post('/user-details/:id', this.endpoints.postUserDetails)
    this.app.post('/user-details/:id/topic/:topic/', this.endpoints.postUserTopic)
    this.app.post('/user-details/:id/topic/:topic/post/:post', this.endpoints.postUserTopicPost)
    this.app.get('*', (request, response) => {
      response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    })
  }
}

let users = [
  // serve static assets normally
  express.static('public'),
  bodyParser.urlencoded({
    extended: false
  }),
  bodyParser.json()
]

const client = new RemoteDynamoDB(hostname, env)
const endpoints = new Endpoints(client)
const goalDServer = new GoalDServer(express, port, users, endpoints)
goalDServer.routes()
goalDServer.start()
