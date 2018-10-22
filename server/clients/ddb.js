'use strict'

var AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })
var dynamo = new AWS.DynamoDB()

const userDetails = 'goald-user-details'
const userDetailsTopic = 'goald-user-details-topics'
const userDetailsTopicPosts = 'goald-user-details-topics-posts'

class DynamoDynamoDB {
  constructor () {
    this.docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })
  }

  getUserDetails (user) {
    let payload = {
      TableName: userDetails,
      Key: {
        'user-id': user
      }
    }
    console.log('getUserDetails payload', payload)
    return this.docClient.get(payload).promise()
      .then(data => {
        console.log(data)
        try {
          return JSON.parse(data.Item.item.toString())
        } catch (e) {
          return data.Item
        }
      })
      .catch(err => {
        console.log('err: getUserDetails', err)
        return err
      })
  }

  postUserDetails (user, body) {
    let topics = JSON.parse(body)
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].note === '') {
        delete topics[i].note
      }
    }
    let payload = {
      TableName: userDetails,
      Item: {
        'user-id': user,
        topics
      }
    }
    console.log('postUserDetails payload', JSON.stringify(payload))
    return this.docClient.put(payload).promise()
  }

  getUserTopic (user, topic, callback) {
    let payload = {
      TableName: userDetailsTopic,
      Key: {
        'user-id': user,
        topic
      }
    }
    console.log('getUserTopic payload', payload)
    return this.docClient.get(payload).promise()
      .then(data => JSON.parse(data.Item.item.toString()))
      .catch(err => {
        console.log('err: getUserTopic', err)
        return err
      })
  }

  postUserTopic (user, topic, body) {
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
    return dynamo.putItem(payload).promise()
  }

  getUserTopicPosts (user, topic, postList, callback) {
    dynamo.scan(user, callback)
  }

  postUserTopicPost (user, topic, body, post) {
    let payload = {
      TableName: userDetailsTopicPosts,
      Item: {
        'user-id': {
          S: user
        },
        topic: {
          S: topic
        },
        Notes: {
          B: Buffer.from(body)
        }
      }
    }
    console.log('postUserTopicPost payload', payload)
    return dynamo.putItem(payload).promise()
  }
}
module.exports = DynamoDynamoDB
