const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const userDetails = 'user-details'
const userDetailsPost = 'user-details-post'

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:3000"
});

function getUserDetails(user, callback) {
  let payload = {
    "TableName": userDetails,
    "Item": {
      "user": user
    }
  }
  dynamo.getItem(payload, callback);
}

function setUserDetails(user, body, callback) {
  let payload = {
    "TableName": userDetails,
    "Item": {
      "user": user,
      "item":body
    }
  }
  dynamo.getItem(payload, callback);
}

function getUserTopic(user, topic, callback) {
  let payload = {
    "TableName": userDetails,
    "Item": {
      "user": user + '-' + topic
    }
  }
  dynamo.getItem(payload, callback);
}

function setUserTopic(user, topic, body, callback) {
  let payload = {
    "TableName": userDetails,
    "Item": {
      "user": user + '-' + topic,
      "item":body
    }
  }
  dynamo.getItem(payload, callback);
}

function getUserTopicPosts(user, topic, postList, callback) {
  dynamo.scan(payload, callback);
}

const client = {
  getUserDetails: getUserDetails,
  setUserDetails: setUserDetails,
  getUserTopic: getUserTopic,
  setUserTopic: setUserTopic,
  getUserTopicPosts: getUserTopicPosts,
  setUserTopicOnPost: setUserTopicOnPost
}

var exports = module.exports = client
return module.exports
