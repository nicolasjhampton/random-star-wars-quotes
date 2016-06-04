var hostname = 'localhost';
var port = '3000';

module.exports = {
    entry: 'mocha!./test/quoter.test.js',
    output: {
        filename: 'test.build.js',
        path: 'test/',
        publicPath: 'http://' + hostname + ':' + port + '/tests'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }]
    },
    devServer: {
        host: hostname,
        port: port
    }
};
