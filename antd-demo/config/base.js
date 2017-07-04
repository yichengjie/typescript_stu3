const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let common = require('./common.js') ;
let distPath = common.getDistPath() ;
let srcPath = common.getSrcPath() ;

module.exports = {
    entry: {
        index:srcPath + "/index.jsx",
    },
    output: {
        filename: "bundle.js",
        path: distPath,
        publicPath:'/'
    },
    // Enable sourcemaps for debugging webpack's output.
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
           {
            test: /\.jsx?$/,exclude: [/node_modules/],
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          { test: /\.less$/, 
            use:ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader!less-loader"
            })
          },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename:"style.[contenthash:16].css"
        }),
    ],
};