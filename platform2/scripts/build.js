'use strict';
let webpack = require('webpack') ;
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

let config = require('../client/config/prod.js') ;
let compiler = webpack(config);
compiler.run((err, stats) => {
    if (err) {
    console.info(err);
    return ; 
    }
    const messages = formatWebpackMessages(stats.toJson({}, true));
    if (messages.errors.length) {
    console.info(messages.errors.join('\n\n'));
    return ;
    }
    if (process.env.CI && messages.warnings.length) {
    console.log(
        chalk.yellow(
        '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
        )
    );
    console.info(messages.warnings.join('\n\n'));
    return ;
    }
    console.info('compile success') ;
    return true ;
});