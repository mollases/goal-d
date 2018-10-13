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

  getUserDetails (user) {
    let payload = {
      TableName: userDetails,
      Key: {
        'user-id': {
          S: user
        }
      }
    }
    console.log('getUserDetails payload', payload)
    return dynamo.getItem(payload).promise()
      .then(data => JSON.parse(data.Item.item.B.toString()))
      .catch(err => {
        console.log('err: getUserDetails', err)
        return err
      })
  }

  postUserDetails (user, body) {
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
    console.log('postUserDetails payload', payload)
    return dynamo.putItem(payload).promise()
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
    console.log('getUserTopic payload', payload)
    return dynamo.getItem(payload).promise()
      .then(data => JSON.parse(data.Item.item.B.toString()))
      .catch(err => {
        console.log('err: getUserTopic', err)
        return err
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
    console.log('postUserTopic payload', payload)
    dynamo.putItem(payload, callback)
  }

  postUserTopicPost (user, topic, post, body, callback) { console.log(arguments) }

  getUserTopicPosts (user, topic, postList, callback) {
    dynamo.scan(user, callback)
  }
}
module.exports = DynamoDynamoDB
