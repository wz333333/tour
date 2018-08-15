let mysql = require('mysql');

//创建连接池
let pool = global.pool;
if(!pool){
    pool = mysql.createPool({
        host:'127.0.0.1',
        port:'3306',
        database:'tourism',
        user:'root',
        password:'123456'
    });
    global.pool = pool;
}

//执行语句
module.exports = {

	excute:  (sql,handler) => {
		
		// 创建promise函数
		let getConnect =  new Promise((resolve,reject) => {
				pool.getConnection((err,connection) =>{
					if(err){
						reject(err);
					}else{
						resolve(connection);
					}
				});
			});	
		getConnect.then((connection) => {
				connection.query(sql,(err,results) => {
						if(err){
							throw err;
						}else{
							handler(results);
						}
					});
				return connection;
				},function(err){
					throw err;
				}).then((connection) => {
					connection.release();
				});
	}

};