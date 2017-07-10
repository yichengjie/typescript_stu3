'use strict';
let webpack = require('webpack') ;
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
let config = require('../client/config/prod.js') ;
var compiler = webpack(config);

compiler.plugin('invalid', function() {
  console.log('Compiling...');
});

compiler.plugin('done', function(stats) {
  var rawMessages = stats.toJson({}, true);
  var messages = formatWebpackMessages(rawMessages);
  if (!messages.errors.length && !messages.warnings.length) {
    console.log('Compiled successfully!');
    console.info('message : ' , messages) ;
  }
  if (messages.errors.length) {
    console.log('Failed to compile.');
    messages.errors.forEach(e => console.log(e));
    return;
  }
  if (messages.warnings.length) {
    console.log('Compiled with warnings.');
    messages.warnings.forEach(w => console.log(w));
  }
});

compiler.run(function(error,state){
    console.info('error : ' ,error) ;
    //console.info('state : ' ,state) ;
}) ;