let express = require('express');
let router = express.Router();
let user = require('../db/user');
let fs = require('fs');

let resInfo = {
        status:""
    },
    promise = req => {
        return new Promise((resolve,reject) =>  {
            user.findAllAccount(results => {
                let array = [req.body.name,req.body.password1];
                let val = results.some(item => req.body.name == item.name);
                if(val)
                    reject(array);
                else
                    resolve(array);
            });
        });
    };

// 注册用户,返回两个数据值,分别为 0 :用户已存在; 1 :注册成功
router.post('/register',(req,res) => {
    promise(req).then(array => {
                return new Promise((resolve,reject) => {
                    account.addAccount(array,() => {
                        resolve();
                    });
                }).then(() => {
                    user.findByName(req.body.name,result => {
                        user.addInfo(result[0].id,() => '');
                   });
                    return 1;
                });
            },array => 0).then(data => {
                resInfo.status = data;
                res.send(resInfo);
            });

});

// 修改用户密码,返回两个数据值,分别为 0 :用户名不存在！; 1 :修改成功
router.post('/repead',(req,res)  => {
    promise(req).then(array => 0,array => {
        account.repead(array,() => "");
        return 1;
    }).then(data => {
            resInfo.status = data;
            res.send(resInfo);
        });
});

// 登录验证,返回三个数据值,分别为 0 :用户名不存在！; 1 :登录成功!;2密码错误!
router.post('/login',(req,res) => {
    promise(req).then(array => 0,array => {
        return new Promise((resolve,reject) =>  {
            account.findAll(results => {
                let val = results.some(item => (req.body.name == item.name) && (req.body.password == item.password));
                if(val)
                    resolve();
                else
                    reject();
            });
        }).then(() => {
            initialize(req.body.name).then(() => 1);
        },() => 2);
    }).then(data => {
            resInfo.status = data;
            res.send(resInfo);
        });
});

// 根据id获取用户数据
router.post('/get',(req,res) => {
    let id = Number(req.body.id)
    user.findById(id,results => {
        res.send(results);     
    });
});

// 获取用户数据
router.post('/getAll',(req,res) => {
    user.findAllAccount(results => {
        res.send(results);     
    });
});

//根据用户名获取用户数据
router.post('/getDataByUser_name',(req,res) => {
    new Promise((resolve) =>  {
        user.findIdByName(req.body.name,(results) => {
            resolve(results[0].id);
        });
    }).then(id => {
        user.findAllInfoById(id,data => {
            res.send(data);
        })
    });
});

//根据用户名获取用户所有信息
router.post('/getInfo',(req,res) => {
    new Promise((resolve) =>  {
        user.findIdByName(req.body.name,(results) => {
            resolve(results[0].id);
        });
    }).then(id => {
        user.findAllInfoById(id,data => {
            res.send(data);
        })
    });
});

//添加取用户所有信息
router.post('/repeadInfo',(req,res) => {
    
    let arr = [Number(req.body.age),req.body.gender,req.body.birth,req.body.dream_place,Number(req.body.id),req.body.blood_type,req.body.living_place,req.body.birthplace,req.body.profession,req.body.company_name,req.body.marital_status,req.body.detailed_address];
 
    user.repeadInfo(arr,() => {
        resInfo.status = 1;
        res.send(resInfo);
    });
});

//用户初次登录初始化文件夹，并给出默认图片头像
function initialize(name) {

    let path = 'public/upload/';
    return new Promise((resolve,reject) => {
        fs.readdir(path+name+'',err => {
            if(err)
                resolve();
            else
                reject();
        }).then(() => {
            return new Promise((resolve) => {
                fs.mkdir(path+name+'',err => {
                    if(err)
                        throw err;
                    else
                        resolve();
                }).then(() => {
                    fs.mkdir(path+name+'/avator',err => {throw err});
                    fs.mkdir(path+name+'/default',err => {throw err});
                });
            });
        },() => "");
    });
}


module.exports = router;
