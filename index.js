const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const redis = require('redis')
const client = redis.createClient();

// serve static assets normally
app.use(express.static(__dirname + '/public'))

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/api/',function (request, response) {
  client.incr('magic');
  client.get('magic', function (err,magicr){
    response.json({'h':err || magicr});
  })
});
// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
