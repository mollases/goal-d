'use strict'

const request = require('request');
const hostname = 'https://zpdg9c0o8j.execute-api.us-west-2.amazonaws.com';
const env = '/dev/';

function callRemoteDDB(path,body,callback) {
  var url = hostname + env + path;

  var options = {
    url : url,
    method: 'get'
  }

  if(body){
    options.method= 'post';
    options.body = body;
    options.json = true;
  }

  request(options, function (err, res, body) {
    if (err) {
      console.error('error posting json: ', err)
      throw err
    }
    var headers = res.headers
    var statusCode = res.statusCode
    console.log('headers: ', headers)
    console.log('statusCode: ', statusCode)
    console.log('body: ', body)
    callback(body);
  })
}

function getUserDetails(user, callback) {
  var path = '/user-details/'+user;
  var content = undefined;
  callRemoteDDB(path,content,callback)
}

function postUserDetails(user, body, callback) {
  var path = '/user-details/'+user;
  var content = body;
  callRemoteDDB(path,content,callback)
}

function getUserTopic(user, topic, callback) {
  var path = '/user-details/'+user+'/topic/'+topic;
  var content = undefined;
  callRemoteDDB(path,content,callback)
}

function postUserTopic(user, topic, body, callback) {
  var path = '/user-details/'+user+'/topic/'+topic;
  var content = body;
  callRemoteDDB(path,content,callback)
}

function postUserTopicPost(user, topic, post, body, callback) {
  var path = '/user-details/'+user+'/topic/'+topic+'/post/'+post;
  var content = body;
  callRemoteDDB(path,content,callback)
}

function getUserTopicPosts(user, topic, postList, callback) {
  var path = '/user-details/'+user+'/topic/'+topic+'/posts/'+postlist;
  var content = undefined;
  callRemoteDDB(path,content,callback)
}

return module.exports = {
  getUserDetails: getUserDetails,
  postUserDetails: postUserDetails,
  getUserTopic: getUserTopic,
  postUserTopic: postUserTopic,
  getUserTopicPosts: getUserTopicPosts,
  postUserTopicPost: postUserTopicPost,
  type: 'remote ddb'
}
