'use strict'
const client = require('./clients/ddb.js');

console.log('client.type',client.type);

module.exports.getUserDetails = (request, response) => {
  console.log('getUserTopic',request.body);
  client.getUserDetails(request.params.id, function(err, user) {
    console.log('response getUserDetails',user);
    response.json(err || user);
  });
};

module.exports.postUserDetails = (request, response) => {
  console.log('postUserDetails',JSON.stringify(request.body));
  client.setUserDetails(request.params.id, request.body, function(err, saved) {
    response.json(err || saved);
    console.log('err postUserDetails',JSON.stringify(err));
    console.log('response postUserDetails',JSON.stringify(saved));
  });
};

module.exports.getUserTopic = (request, response) => {
  console.log('getUserTopic',request.body);
  client.getUserTopic(request.params.id,request.params.topic, function(err, user) {
    console.log('response getUserDetails',user);
    response.json(err || user);
  });
};

module.exports.postUserTopic = (request, response) => {
  console.log('postUserTopic',request.body);
  client.setUserTopic(request.params.id,request.params.topic, request.body, function(err, saved) {
    console.log('response postUserTopic',saved);
    response.json(err || saved);
  });
};

module.exports.getUserTopicPost = (request, response) => {
  console.log('getUserTopicPost',request.body);
  var all = request.params.extra.split(',');
  client.getUserTopicPosts(request.params.id, request.params.topic, all, function(err, post) {
    console.log('response getUserTopicPost',post);
    response.json(err || post);
  });
};

module.exports.postUserTopicPost = (request, response) => {
  console.log('postUserTopicPost',request.body);
  var content = request.body;
  content.timestamp = +new Date();
  client.setUserTopicOnPost(request.params.id,request.params.topic,request.params.post,content, function(err, saved) {
    console.log('response postUserTopicPost',saved);
    response.json(err || saved);
  });
};
