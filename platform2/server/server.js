var express = require('express');
var app = express();
var path = require('path') ;
var port = 9090 ;

let publicPath = path.resolve(__dirname,'../public') ;
let jspPath = path.resolve(__dirname,'../jsp') ;
let distPath = path.resolve(__dirname,'../dist') ;

app.use('/public',express.static(publicPath));
app.use(express.static(jspPath));
app.use('/dist',express.static(distPath));


//getAllCategoryStaticData 
app.get('/api/jcf',function(req, res){
  let category4List = CategoryService.queryAllCategory4() ;
  let retData = {
      flag:true,
      data:category4List
  } ;
  res.json(retData);
}) ;


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});