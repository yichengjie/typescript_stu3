var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("../client/config/dev.js");

let common = require('../client/config/common.js') ;
var publicPath = common.getPublicPath() ;
//let localIPAddress = common.getIPAdress() ;
let localIPAddress = 'localhost' ;
let serverIPAddress = common.getIPAdress();
let localPort = 3000 ;
let serverPort = 9090 ;



var compiler = webpack(config);
var server = new webpackDevServer(compiler,{
    port: localPort,
    //所有来自 dist/目录的文件都做 gzip 压缩和提供为服务
    compress:true,
    host:localIPAddress,
    contentBase: [publicPath],  // New
    //其实很简单的，只要配置这个参数就可以了  
    stats: {
    　　 colors: true // 用颜色标识
    },
    hot:true,
    proxy: {  
        '/api/*/**': {  
            target: 'http://'+serverIPAddress+':'+serverPort+'/',  
            secure: false  
        }  
    }  
});
server.listen(localPort);