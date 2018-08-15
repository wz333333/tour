let fs = require('fs');
let express = require('express');
let multer  = require('multer');

let user = require('../db/user');

let messages = require('../db/messages');

let uploadRouter = express.Router();

//配制multer参数，设置上传的文件存储路径为upload,upload要自己在后台创建这个目录
let upload = multer({ dest: 'upload/'});


//上传头像并返回头像地址,返回一个数据集合,当集合属性值为1时,表示上传更改成功
uploadRouter.post('/upload-header',upload.single('logo'), (req,res,next) => {
    let hint = {
        status:0,
        info:''
    };

    new Promise(resolve => {
            fs.rename(req.file.path, "public/upload/"+req.body.name+"/use_headers/" + req.file.originalname,err => {
                if(err)
                    throw err;
                else
                    resolve();
            });
        }).then(() => {
            user.findAllAccount(results => {
                results.forEach(item =>{
                    if(req.body.user_name == item.user_name){
                        let avator = item.avator+",./upload/"+req.body.user_name+"/use_headers/" + req.file.originalname;
                        let array = [req.body.user_name,avator];
                        user.repeadHeadPath(array,() => {
                            hint.info = array[1].avator;
                            hint.status = 1;
                            res.send(hint);
                        })
                    }
                });
            });
        });
});


uploadRouter.post("/user",function (rq,rs,next) {
    let user_name = rq.body.name;
    uploadRouter.post('/upload-files',upload.any(),function (req, res, next) {
        str = req.files[0].originalname;
        let str = req.files[0].originalname;
        fs.rename(req.files[0].path, "public/upload/"+user_name+"/1/" + req.files[0].originalname, function(err) {
            if (err) {
                throw err;
            }
        });
        res.send("success");           
    });        
    rs.send("success");
});

module.exports = uploadRouter;