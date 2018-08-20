const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        "javascripts/app": './public/javascripts/index.js'
    },
    output:{
        filename: '[name].[chunkhash].js',
        path:path.resolve(__dirname,"dist"),
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'public/index.html'
        })
    ],
    module: {
        rules: [
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.js$/, loader: 'babel-loader'}
            {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file-loader'},
            {test: /\.html$/,loader: 'html-withimg-loader'},
            {test:/\.(jpg|png|gif|jpeg)$/,loader: 'file-loader'}
        ]
    },
    
    mode:"development" //开发环境
}
