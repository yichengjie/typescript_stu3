const webpack = require('webpack') ;
const webpackMerge = require('webpack-merge');
var ManifestPlugin = require('webpack-manifest-plugin');
const commonConfig = require('./base.js');
let path = require('path') ;
let appPath = path.resolve(__dirname, '../') ;
let common = require('./common.js') ;
var distPath = path.join(__dirname, '../../dist') ;
var publicPath = path.join(__dirname, '../../public') ;


module.exports = function() {
    //清空dist目录
    common.deleteall(distPath) ;
    //复制需要的文件到dist目录
    //common.copyAllFileToPath( publicPath, distPath);

    return webpackMerge(commonConfig(), {
        output: {
            path: distPath,
            filename: '[name].[chunkhash].js',
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new ManifestPlugin({
                fileName: 'chunk-manifest.json',
            }),
            new webpack.optimize.UglifyJsPlugin({
                comments: false
            }),
        ]
    })
}