const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let common = require('./common.js') ;
const clientPath = common.getClientPath() ;
const srcPath = common.getSrcPath() ;
const typescriptPath = common.getTypescriptPath() ;

console.info('typescriptPath : ' ,typescriptPath) ;

module.exports = {
    context: srcPath,
    entry:{
        login:[
          'react-hot-loader/patch',
          './entrys/login'
        ],
        category4Query:[
            'react-hot-loader/patch',
            './entrys/category4Query'
        ] ,
        category4Edit:[
            'react-hot-loader/patch',
            './entrys/category4Edit'
        ],
        vendor: ['react','react-dom','moment','lodash'], 
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          test: /\.jsx?$/,exclude: [/node_modules/],
          loader: "babel-loader",
          include:srcPath
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
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
};