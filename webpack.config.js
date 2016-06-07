var webpack = require('webpack');

module.exports = {
     entry: {
       "app": "./src/js/quoter.js",
       "vendor": ["babel-polyfill", "jquery"]
     },
     devtool: 'source-map',
     output: {
       path: "./build/js",
       filename: "[name].bundle.js",
       sourceMapFilename: "[name].map.js"
     },
     module: {
       loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: "babel-loader",
       }]
     },
     plugins: [
       new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity),
       new webpack.ProvidePlugin({ $: "jquery" })
     ]
 };
