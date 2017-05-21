'use strict'
const endpoints = require('./endpoints.js')

var fns = {};
const headers =  {
  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
}
;
for(var v in endpoints){
  fns[v] = function (request,context,callback){
    console.log(JSON.stringify(request))
    var fn = context.functionName.split('-')[2];
    request.params = request.pathParameters;
    var transformer = {
      json:function(arg){
        callback(null,{
          statusCode:200,
          headers: headers,
          body:JSON.stringify(arg)});
      },
      opts:function(){
        callback(null,{
          statusCode:200,
          headers: headers
        });
      }
    }
    var method = request.httpMethod;
    if(method === 'HEAD' || method === 'OPTIONS'){
      transformer.opts();
      return;
    }
    endpoints[fn](request,transformer);
  }
}

module.exports = fns;
