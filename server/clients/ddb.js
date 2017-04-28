'use strict'

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var dynamo = new AWS.DynamoDB();

const userDetails = 'user-details'
const userDetailsPost = 'user-details-post'

function getUserDetails(user, callback) {
  let payload = {
    TableName: userDetails,
    Key: {
      S: user
    },
    AttributesToGet:['item']
  }
  console.log(payload)
  dynamo.getItem(payload, callback);
}

function setUserDetails(user, body, callback) {
  let payload = {
    TableName: userDetails,
    Item: {
      user: {
        S:user
      },
      item: {

      }
    }
  }
  console.log(payload);
  dynamo.putItem(payload, callback);
}

function getUserTopic(user, topic, callback) {
  let payload = {
    TableName: userDetails,
    Item: {
      user: user + '-' + topic
    }
  }
  dynamo.getItem(payload, callback);
}

function setUserTopic(user, topic, body, callback) {
  let payload = {
    TableName: userDetails,
    Item: {
      user: user + '-' + topic,
      item:body
    }
  }
  dynamo.putItem(payload, callback);
}

function setUserTopicOnPost(user, topic, post, body, callback) {console.log(arguments)}

function getUserTopicPosts(user, topic, postList, callback) {
  dynamo.scan(payload, callback);
}

return module.exports = {
  getUserDetails: getUserDetails,
  setUserDetails: setUserDetails,
  getUserTopic: getUserTopic,
  setUserTopic: setUserTopic,
  getUserTopicPosts: getUserTopicPosts,
  setUserTopicOnPost: setUserTopicOnPost
}
