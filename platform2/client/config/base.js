const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let common = require('./common.js') ;
const srcPath = common.getSrcPath() ;

module.exports = {
    context: srcPath,
    entry:{
        index:[
            './demo.tsx'
        ] ,
        vendor: ['react','react-dom'], 
    },
    resolve: {
       extensions: [".ts", ".tsx", ".js",".less"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,exclude: [/node_modules/],
          loader: "babel-loader!ts-loader"
        },
        {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
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
      new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          minChunks: 2,
      }),
      new ExtractTextPlugin({
        filename:"style.[contenthash:16].css"
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
};