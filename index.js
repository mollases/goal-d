const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const redis = require('redis')
const client = redis.createClient();
const bodyParser = require('body-parser');
const db = require('./server/db');

// serve static assets normally
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

client.on("error", function(err) {
  console.log("Error " + err);
});

app.get('/user-details/:id', function(request, response) {
  db.read('user-details',request.params.id, function(err, user) {
    response.json(err || user);
  });
});

app.post('/user-details/:id', function(request, response) {
  console.log(request.body);
  client.hset('user-details', request.params.id, JSON.stringify(request.body), function(err, saved) {
    response.json(err || saved);
  });
});

app.get('/user-details/:id/topic/:topic', function(request, response) {
  client.hget('user-details', request.params.id + '-' + request.params.topic, function(err, user) {
    response.json(err || user);
  });
});

app.post('/user-details/:id/topic/:topic/', function(request, response) {
  console.log(request.body);
  client.hset('user-details', request.params.id + '-' + request.params.topic, JSON.stringify(request.body), function(err, saved) {
    response.json(err || saved);
  });
});

app.get('/user-details/:id/topic/:topic/post/:post', function(request, response) {
  client.lrange('user-details-post ' + request.params.id + '-' + request.params.topic + '-' + request.params.post, 0, -1, function(err, post) {
    response.json(err || post);
  });
});

app.post('/user-details/:id/topic/:topic/post/:post', function(request, response) {
  var content = request.body;
  console.log(content);
  content.timestamp = +new Date();

  var body = JSON.stringify(content);
  client.lpush(['user-details-post ' + request.params.id + '-' + request.params.topic + '-' + request.params.post, body], function(err, saved) {
    response.json(err || saved);
  });
});

// Handles all routes so you do not get a not found error
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
