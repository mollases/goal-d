'use strict'
const redis = require('redis')
const redisClient = redis.createClient();
const userDetails = 'user-details'
const userDetailsPost = 'user-details-post'

redisClient.on("error", function(err) {
  console.error("Error " + err);
})

function getUserDetails(user, callback) {
  redisClient.hget(userDetails, user, callback);
}

function setUserDetails(user, body, callback) {
  redisClient.hset(userDetails, user, JSON.stringify(body), callback)
}

function getUserTopic(user, topic, callback) {
  redisClient.hget(userDetails, user + '-' + topic, callback)
}

function setUserTopic(user, topic, body, callback) {
  redisClient.hset(userDetails, user + '-' + topic, JSON.stringify(body), callback)
}

function getUserTopicPosts(user, topic, postList, callback) {
  var callCount = 0;
  var responses = [];
  console.log(postList);
  for (var i = 0; i < postList.length; i++) {
    redisClient.lrange('user-details-post-' + user + '-' + topic + '-' + postList[i], 0, -1, function(err, post) {
      callCount++;
      responses.push(err || post);
      if (callCount === postList.length) {
        console.log(callCount)
        callback(responses);
      }
    });
  }
}

function setUserTopicOnPost(user, topic, post, body, callback) {
  redisClient.lpush([userDetailsPost + '-' + user + '-' + topic + '-' + post, JSON.stringify(body)], callback)
}

return module.exports = {
  getUserDetails: getUserDetails,
  setUserDetails: setUserDetails,
  getUserTopic: getUserTopic,
  setUserTopic: setUserTopic,
  getUserTopicPosts: getUserTopicPosts,
  setUserTopicOnPost: setUserTopicOnPost,
  type:'local-redis'
}
