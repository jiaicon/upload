const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'dist/index.js',
        path: path.resolve(__dirname, '../'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: "dist/img/[hash:8].[name].[ext]"
                }
            }, {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js\.map$/,
                use: {
                    loader: 'file-loader'
                },
            }
        ]
    },
    externals: [nodeExternals()]
};
