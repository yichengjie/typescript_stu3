var express = require('express');
var app = express();
var path = require('path') ;
let sihService = require('./sih/sihService.js') ;

var port = 9090 ;

let publicPath = path.resolve(__dirname,'../public') ;
let jspPath = path.resolve(__dirname,'../jsp') ;
let distPath = path.resolve(__dirname,'../dist') ;

app.use('/public',express.static(publicPath));
app.use(express.static(jspPath));
app.use('/dist',express.static(distPath));

// app.get('/hello',function(req, res){
//    res.send('hello world');
// }) ;

app.post('/api/jcf/sih.action',async function(req, res){
  let retData =  await sihService.querySIHData() ;
  res.json(retData);
}) ;


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});