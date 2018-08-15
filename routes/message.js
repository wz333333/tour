let express = require('express');
let messageRouter = express.Router();
let messages = require('../db/messages');
let user = require('../db/user');

let info = {
	status:0
}

// 添加留言信息,返回数据值,分别为 0 :留言失败; 1 :留言成功!
messageRouter.post('/refer', (req, res) => {
	new Promise((resolve) =>  {
        user.findIdByName(req.body.name,(results) => {
            resolve(results[0].id);
        });
    }).then(id => {
		let arr = [req.body.info,req.body.imgSrc,req.body.time,id,req.body.labels];
        user.addMessage(arr,() => {
			info.status = 1;
			res.send(info);
        })
    });
});

// 添加留言信息,返回数据值,分别为 0 :评论失败; 1 :评论成功!
messageRouter.post('/comment', (req, res) => {
	new Promise((resolve) =>  {
        user.findIdByName(req.body.name,(results) => {
            resolve(results[0].id);
        });
    }).then(id => {
		let arr = [req.body.text,Number(req.body.id),id];
        user.addComment(arr,() => {
			info.status = 1;
			res.send(info);
        })
    });
});

// 获取留言信息
messageRouter.post('/refresh', (req, res) => {
	messages.findAllMessages( (result) => {
		res.send(result);
	});
});

// 增加评论数,并返回当前数值
messageRouter.post('/add', (req, res) => {
	new Promise((resolve) =>  {
        messages.findAllMessages(results => {
            resolve(results);
        });
    }).then(results => {
		results.forEach(item => {
            if(Number(req.body.id) === item.id){
            	let arr = [item.id,item.comments+1];
                messages.addCommentNum(arr,resu => {
					let num = {
						num:arr[1]
					};
                	res.send(num);
                })
            }
        });
    });
});

//增加点赞数
messageRouter.post('/font', function(req, res, next) {
	messages.findAllMessages(function (result) {
		result.forEach(function(item,index){
            if(Number(req.body.message_id) === item.id){
            	let num = item.praise+1;
            	let arr = [item.id,item.praise+1];
                messages.addPraiseNum(arr,function (resu) {
                	res.send(String(num));
                })
            }
        });
	})
});

messageRouter.post("/getAll",function(req,res,next){
	messages.findAllMessages(function (result) {
		res.send(result);
	})
})

messageRouter.post('/getComments', function(req, res, next) {
	messages.findComments(function (result) {
		res.send(result);
	})
});

module.exports = messageRouter;