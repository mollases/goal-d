'use strict'
const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const client = require('./ddb.js')
const bodyParser = require('body-parser');

// serve static assets normally
app.use(express.static(__dirname + './../public'))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/user-details/:id', function(request, response) {
  client.getUserDetails(request.params.id, function(err, user) {
    response.json(err || user);
  });
});

app.post('/user-details/:id', function(request, response) {
  console.log(request.body);
  client.setUserDetails(request.params.id, request.body, function(err, saved) {
    response.json(err || saved);
  });
});

app.get('/user-details/:id/topic/:topic', function(request, response) {
  client.getUserTopic(request.params.id,request.params.topic, function(err, user) {
    response.json(err || user);
  });
});

app.post('/user-details/:id/topic/:topic/', function(request, response) {
  console.log(request.body);
  client.setUserTopic(request.params.id,request.params.topic, request.body, function(err, saved) {
    response.json(err || saved);
  });
});

app.get('/user-details/:id/topic/:topic/post/:post', function(request, response) {
  client.getUserTopicPosts(request.params.id, request.params.topic, [request.params.post], function(err, post) {
    response.json(err || post);
  });
});

app.get('/user-details/:id/topic/:topic/post/:post/extra/:extras', function(request, response) {
  var extras = request.params.extras.split(',');
  extras.push(request.params.post);
  client.getUserTopicPosts(request.params.id, request.params.topic, extras, function(responses) {
    response.json(responses)
  })
});

app.post('/user-details/:id/topic/:topic/post/:post', function(request, response) {
  var content = request.body;
  console.log(content);
  content.timestamp = +new Date();
  client.setUserTopicOnPost(request.params.id,request.params.topic,request.params.post,content, function(err, saved) {
    response.json(err || saved);
  });
});

// Handles all routes so you do not get a not found error
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
})

// app.listen(port)
// console.log("server started on port " + port)

module.exports = app
