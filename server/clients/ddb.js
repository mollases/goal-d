'use strict'

var AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })
var dynamo = new AWS.DynamoDB()

const userDetails = 'goald-user-details'
const userDetailsTopic = 'goald-user-details-topics'

class DynamoDynamoDB {
  constructor () {
    this.type = 'DynamoDynamoDB'
  }

  getUserDetails (user, callback) {
    let payload = {
      TableName: userDetails,
      Key: {
        'user-id': {
          S: user
        }
      }
    }
    dynamo.getItem(payload, function (err, data) {
      var B = data.Item.item.B
      callback(err, JSON.parse(B.toString()))
    })
  }

  postUserDetails (user, body, callback) {
    let payload = {
      TableName: userDetails,
      Item: {
        'user-id': {
          S: user
        },
        item: {
          B: Buffer.from(body)
        }
      }
    }
    console.log(payload)
    dynamo.putItem(payload, callback)
  }

  getUserTopic (user, topic, callback) {
    let payload = {
      TableName: userDetailsTopic,
      Key: {
        'user-id': {
          S: user
        },
        'topic': {
          S: topic
        }
      }
    }
    dynamo.getItem(payload, function (err, data) {
      var B = data.Item.item.B
      callback(err, JSON.parse(B.toString()))
    })
  }

  postUserTopic (user, topic, body, callback) {
    let payload = {
      TableName: userDetailsTopic,
      Item: {
        'user-id': {
          S: user
        },
        topic: {
          S: topic
        },
        item: {
          B: Buffer.from(body)
        }
      }
    }
    dynamo.putItem(payload, callback)
  }

  postUserTopicPost (user, topic, post, body, callback) { console.log(arguments) }

  getUserTopicPosts (user, topic, postList, callback) {
    dynamo.scan(user, callback)
  }
}
module.exports = DynamoDynamoDB
