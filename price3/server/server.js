var express = require('express');
var app = express();
var path = require('path') ;
var bodyParser = require('body-parser');

var port = 9090 ;
var CategoryService = require('./category/category4.js') ;

let publicPath = path.resolve(__dirname,'../public') ;
let jspPath = path.resolve(__dirname,'../jsp') ;
let distPath = path.resolve(__dirname,'../dist') ;

app.use('/public',express.static(publicPath));
app.use(express.static(jspPath));
app.use('/dist',express.static(distPath));
app.use(bodyParser.json());


//getAllCategoryStaticData 
app.get('/api/queryAllCategory4',function(req, res){
  let category4List = CategoryService.queryAllCategory4() ;
  let retData = {
      flag:true,
      data:category4List
  } ;
  res.json(retData);
}) ;


//queryCategory4ById 
app.get('/api/queryCategory4ById',function(req, res){
  let id = req.query.id ;
  console.info('query url id is : ' + id) ;
  let category4 = CategoryService.queryCategory4ById(id) ;
  let retData = {
      flag:true,
      data:category4,
  } ;
  res.json(retData);
}) ;


app.post('/api/testDoPost1',function(req,res){
  let queryParam = req.body;
  console.info('queryParam : ' , queryParam) ;
  let retData = {
     flag:true,
     msg:'hello world'
  } ;
  res.json(retData) ;
}) ;

app.post('/api/testDoPost2',function(req,res){
  let queryParam = req.body;
  console.info('queryParam : ' , queryParam) ;

  let retData = {
     flag:true,
     msg:'hello world 2'
  } ;
  res.json(retData) ;
}) ;


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});