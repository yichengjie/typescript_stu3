let common = require('./common.js') ;
let distPath = common.getDistPath() ;
let contextPath = common.getContextPath() ;
module.exports = {
    entry: {
        index:contextPath + "/src/index.tsx",
    },
    output: {
        filename: "bundle.js",
        path: distPath,
        publicPath:'/'
    },
    // Enable sourcemaps for debugging webpack's output.
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};