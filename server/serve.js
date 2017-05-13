'use strict'
const endpoints = require('./endpoints.js')

var fns = {};

for(var v in endpoints){
  fns[v] = function (request,context,callback){
    console.log(JSON.stringify(request))
    var fn = context.functionName.split('-')[2];
    request.params = request.pathParameters;
    var transformer = {json:function(arg){
        callback(null,{statusCode:200,body:JSON.stringify(arg)});
      }
    }
    endpoints[fn](request,transformer);
  }
}

module.exports = fns;
