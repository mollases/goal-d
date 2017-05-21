'use strict'
const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const endpoints = require('./server/endpoints.js')
const bodyParser = require('body-parser');

// serve static assets normally
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/user-details/:id', endpoints.getUserDetails);

app.post('/user-details/:id', endpoints.postUserDetails);

app.get('/user-details/:id/topic/:topic', endpoints.getUserTopic);

app.post('/user-details/:id/topic/:topic/', endpoints.postUserTopic);

app.get('/user-details/:id/topic/:topic/posts/:posts', endpoints.getUserTopicPosts);

app.post('/user-details/:id/topic/:topic/post/:post', endpoints.postUserTopicPost);

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
