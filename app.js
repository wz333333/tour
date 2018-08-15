
const cookieParser = require('cookie-parser');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const scenic = require('./routes/scenic');
const user = require('./routes/user');
const upload = require('./routes/upload');
const message = require('./routes/message');


const config = require('./webpack.config.js');
const compiler = webpack(config);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/scenic', scenic);
app.use('/user', user);
app.use('/upload', upload);
app.use('/message', message);



app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
