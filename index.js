const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const redis = require('redis')
const client = redis.createClient();
const bodyParser = require('body-parser');

// serve static assets normally
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/user-details/:id',function (request,response){
  client.hget('user-details',request.params.id,function (err,user){
    response.json(err || user);
  });
});

app.post('/user-details/:id',function (request,response) {
  console.log(request.body);
  client.hset('user-details',request.params.id,JSON.stringify(request.body),function(err,saved){
    response.json(err || saved);
  });
  // client.hset('user',)
});
// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
