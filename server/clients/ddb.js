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

  getUserTopic (user, topic) {
    let payload = {
      TableName: userDetailsTopic,
      Key: {
        'user-id': user,
        topic
      }
    }
    console.log('getUserTopic payload', payload)
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
        console.log('err: getUserTopic', err)
        return err
      })
  }

  postUserTopic (user, topic, item) {
    let contents = JSON.parse(item)
    for (let i = 0; i < contents.map.length; i++) {
      if (contents.map[i].data && contents.map[i].data.label === '') {
        delete contents.map[i].data.label
      }
      if (contents.map[i].classes === '') {
        delete contents.map[i].classes
      }
    }

    let payload = {
      TableName: userDetailsTopic,
      Item: {
        'user-id': user,
        topic,
        ...contents
      }
    }
    console.log('postUserTopic payload', JSON.stringify(payload))
    return this.docClient.put(payload).promise()
      .catch(err => {
        console.log('err', err)
        throw err
      })
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
