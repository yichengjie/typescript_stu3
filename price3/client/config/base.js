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
            './index.tsx'
        ] ,
        edit:[
            'react-hot-loader/patch',
            './edit.tsx'
        ],
        vendor: ['react','react-dom','moment','lodash'], 
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('tslint-loader'),
          enforce: 'pre',
          include: srcPath,
        },
        {
          test: /\.tsx?$/,exclude: [/node_modules/],
          loader: "babel-loader!ts-loader"
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