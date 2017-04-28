'use strict'
const client = require('./clients/ddb.js');

module.exports.getUserDetails = (request, response) => {
  console.log('getUserDetails');
  client.getUserDetails(request.params.id, function(err, user) {
    console.log(arguments);
    response.json(err || user);
  });
};

module.exports.postUserDetails = (request, response) => {
  console.log('postUserDetails');
  console.log(request.body);
  client.setUserDetails(request.params.id, request.body, function(err, saved) {
    response.json(err || saved);
  });
};

module.exports.getUserTopic = (request, response) => {
  console.log('getUserTopic');;
  client.getUserTopic(request.params.id,request.params.topic, function(err, user) {
    response.json(err || user);
  });
};

module.exports.postUserTopic = (request, response) => {
  console.log('postUserTopic');
  console.log(request.body);
  client.setUserTopic(request.params.id,request.params.topic, request.body, function(err, saved) {
    response.json(err || saved);
  });
};

module.exports.getUserTopicPost = (request, response) => {
  var all = request.params.extra.split(',');
  client.getUserTopicPosts(request.params.id, request.params.topic, all, function(err, post) {
    response.json(err || post);
  });
};

module.exports.postUserTopicPost = (request, response) => {
  console.log('postUserTopicPost');
  var content = request.body;
  console.log(content);
  content.timestamp = +new Date();
  client.setUserTopicOnPost(request.params.id,request.params.topic,request.params.post,content, function(err, saved) {
    response.json(err || saved);
  });
};
