var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("../client/config/dev.js");
var compiler = webpack(config);
var server = new webpackDevServer(compiler);
server.listen(9090);