module.exports = {
     entry: './src/js/quoter.js',
     output: {
         path: './build/js',
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
         }]
     }
 };
