const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let common = require('./common.js') ;
const srcPath = common.getSrcPath() ;

module.exports = {
    context: srcPath,
    entry:{
        index:[
            'react-hot-loader/patch',
            './index.jsx'
        ] ,
        edit:[
            'react-hot-loader/patch',
            './edit.jsx'
        ],
        vendor: ['react','react-dom','moment','lodash'], 
    },
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
      new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          minChunks: 2,
      }),
      new ExtractTextPlugin({
        filename:"style.[contenthash:16].css"
      }),
    ],
};