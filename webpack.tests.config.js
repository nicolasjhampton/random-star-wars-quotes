var hostname = 'localhost';
var port = '3000';

module.exports = {
    entry: 'mocha!./test/quoter.test.js',
    output: {
        path: './test/',
        filename: 'test.build.js',
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
