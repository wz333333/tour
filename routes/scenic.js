let express = require('express');
let scenicRouter = express.Router();
let scenic = require('../db/scenic');

scenicRouter.post('/findAllClassification', function(req, res, next) {
	scenic.findAllClassification(function(results){
        res.send(results); 
    });
});
scenicRouter.post('/findAllLabel', function(req, res, next) {
	scenic.findAllLabel(function(results){
        res.send(results); 
    });
});
module.exports = scenicRouter;
