'use strict'
const DynamoDynamoDB = require('./clients/ddb.js')
const Endpoints = require('./endpoints.js')

const dynamoDynamoDB = new DynamoDynamoDB()
const endpoints = new Endpoints(dynamoDynamoDB)
let fns = {}
const headers = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
}

let proto = Object.getOwnPropertyNames(Endpoints.prototype)

for (let v in proto) {
  if (proto[v] === 'constructor') {
    continue
  }
  fns[proto[v]] = (request, context, callback) => {
    console.log(JSON.stringify(request))
    let fn = context.functionName.split('-')[2]
    request.params = request.pathParameters
    let transformer = {
      json: (arg) => {
        callback(null, {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify(arg) })
      },
      opts: () => {
        callback(null, {
          statusCode: 200,
          headers: headers
        })
      }
    }
    let method = request.httpMethod
    if (method === 'HEAD' || method === 'OPTIONS') {
      transformer.opts()
      return
    }
    endpoints[fn](request, transformer)
  }
}

module.exports = fns
