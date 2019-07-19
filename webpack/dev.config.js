const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }, {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader'
            }
        ],
    },
    devServer: {
        contentBase: '../',
      publicPath: '/',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
};
