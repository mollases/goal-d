'use strict'

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var dynamo = new AWS.DynamoDB();

const userDetails = 'goald-user-details'
const userDetailsTopic = 'goald-user-details-topics'

function getUserDetails(user, callback) {
  let payload = {
    TableName: userDetails,
    Key: {
      'user-id' :{
        S: user
      }
    }
  }
  dynamo.getItem(payload, function(err,data){
    var B = data.Item.item.B;
    callback(err,JSON.parse(B.toString()))
  });
}

function postUserDetails(user, body, callback) {
  let payload = {
    TableName: userDetails,
    Item: {
      'user-id': {
        S:user
      },
      item: {
        B:new Buffer(body)
      }
    }
  }
  console.log(payload);
  dynamo.putItem(payload, callback);
}

function getUserTopic(user, topic, callback) {
  let payload = {
    TableName: userDetailsTopic,
    Key: {
      'user-id': {
        S: user
      },
      'topic' : {
        S: topic
      }
    }
  }
  dynamo.getItem(payload, function(err,data){
    var B = data.Item.item.B;
    callback(err,JSON.parse(B.toString()))
  });
}

function postUserTopic(user, topic, body, callback) {
  let payload = {
    TableName: userDetailsTopic,
    Item: {
      'user-id':{
        S: user
      },
      topic: {
        S: topic
      },
      item:{
        B: new Buffer(body)
      }
    }
  }
  dynamo.putItem(payload, callback);
}

function postUserTopicPost(user, topic, post, body, callback) {console.log(arguments)}

function getUserTopicPosts(user, topic, postList, callback) {
  dynamo.scan(payload, callback);
}

return module.exports = {
  getUserDetails: getUserDetails,
  postUserDetails: postUserDetails,
  getUserTopic: getUserTopic,
  postUserTopic: postUserTopic,
  getUserTopicPosts: getUserTopicPosts,
  postUserTopicPost: postUserTopicPost,
  type:'local-ddb'
}
