const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        "javascripts/app": './public/javascripts/index.js',
        // print: './src/print.js'
    },
    output:{
        filename: '[name].[chunkhash].js',
        path:path.resolve(__dirname,"dist"),
        publicPath: '/'
    },
    // resolve:{
    //     alias:{
    //         'imanges': path.resolve(__dirname, '../public/images')
    //     }
    // },
    devtool: 'eval-source-map',
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'public/index.html',
            // chunks:["javascripts/app","javascripts/common.chunk"]
        }),
        // new CommonsChunkPlugin({
        //     name: "javascripts/common.chunk",
        //     chunks: ["javascripts/ui", "javascripts/router"]
        // })
        // new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.js$/, loader: 'babel-loader'},
            // {test : /\.json$/,loader : 'json-loader'},在webpack2.0以上版本不需要再使用json-loader模块
            {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file-loader'},
            {test: /\.html$/,loader: 'html-withimg-loader'},
            {test:/\.(jpg|png|gif|jpeg)$/,loader: 'file-loader'},
            // {test: /\.(jpg|png|jpeg|gif)$/,loader: 'url-loader?name=images/[hash:8].[name].[ext]'}
        ]
    },
    
    mode:"development" //开发环境
}