var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: [
        './src/main.js'
    ],
    output: {
        //path: path.join(__dirname, 'build'),
        path: '',
        filename: 'build/bundle.js'
        //publicPath: '/build/'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlPlugin({
            title: "Render Machine",
            template: 'src/index.ejs'
        })
    ],
    resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less?$/,
                loader: "style!css!less"
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    }
};
