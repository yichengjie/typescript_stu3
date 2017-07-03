const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
let common = require('./common.js') ;
let distPath = common.getDistPath() ;
//清空dist目录
common.deleteall(distPath) ;

module.exports = webpackMerge(commonConfig, {

}) ;