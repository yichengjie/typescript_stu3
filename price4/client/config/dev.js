const webpackMerge = require('webpack-merge');
const webpack = require('webpack') ;
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const commonConfig = require('./base.js');
let path = require('path') ;
let common = require('./common.js') ;
var publicPath = common.getPublicPath() ;
var assetsPath = common.getAssetsPath() ;
let localIPAddress = common.getIPAdress() ;
let localPort = 3000 ;
let serverIPAddress = localIPAddress;
let serverPort = 9090 ;
let serverPort2 = 8080 ;
//这个地址是项目中自己模拟的后台api
let proxyUrl1 = 'http://'+serverIPAddress+':'+serverPort+'/' ; 
//这个地址是真实环境中中的后台api
let proxyUrl2 = 'http://'+serverIPAddress+':'+serverPort2+'/easyfare' ;
//切换后台api接口
let proxyUrl = proxyUrl1 ;


module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    devServer: {
        port: localPort,
        //所有来自 dist/目录的文件都做 gzip 压缩和提供为服务
        compress:true,
        host:localIPAddress,
        contentBase: [publicPath],  // New
        //其实很简单的，只要配置这个参数就可以了  
        hot:true,
        proxy: {  
            '/api/*': {  
                target: proxyUrl,  
                secure: false  
            }  
        }  
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development') //定义生产环境
            }
        }),
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
        new HtmlWebpackPlugin({
            template: assetsPath +'/template.html',
            filename:'index.html',
            inject:'body',
            chunks:['index','vendor']   // 这个模板对应上面那个节点
        }),
        new HtmlWebpackPlugin({
            template: assetsPath +'/template.html',
            filename:'edit.html',
            inject:'body',
            chunks:['edit','vendor']   // 这个模板对应上面那个节点
        })
    ]
});