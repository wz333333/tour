let pool = require('./pool');

module.exports = {
	// 添加账户
	addAccount: (array,handler) =>　{
	    let sql = "insert into user values(null,'"+array[0]+"','"+array[1]+"','./images/login/base.jpg')";
	    pool.excute(sql,handler);
	},

	// 查询所有账户
	findAllAccount: (handler) => {
		let sql = "select * from user";
	    pool.excute(sql,handler);
	},

	// 根据id查找用户名
	findNameById: (id,handler) => {
		let sql = "select name from user where id = "+id+"";
	    pool.excute(sql,handler);
	},

	// 根据id查找用户
	findById: (id,handler) => {
		let sql = "select * from user where id = "+id+"";
	    pool.excute(sql,handler);
	},

	// 根据用户名查找id
	findIdByName: (name,handler) => {
		let sql = "select * from user where name = '"+name+"'";
	    pool.excute(sql,handler);
	},

	// 修改用户密码
	repead: (array,handler) => {
	    let sql = "update user set password = '"+array[1]+"' where id = "+array[0]+"";
	    pool.excute(sql,handler);
	},

	// 修该头像路径
	repeadHeadPath: (array,handler) => {
		let sql = "update user set avator = '"+array[1]+"' where name = '"+array[0]+"'";
	    pool.excute(sql,handler);
	},

	// 根据用户id查找用户信息
	findAllInfoById: (user_id,handler) => {
		let sql = "select * from info where user_id = "+user_id+"";
	    pool.excute(sql,handler);
	},

	// 根据用户名查找用户数据
	findByName: (user_name,handler) => {
		let sql = "select * from user where name = '"+user_name+"'";
	    pool.excute(sql,handler);
	},

	// 添加用户信息
	addInfo: (user_id,handler) => {
		let sql = "insert into info values(null,'--',0,'--','--','--','--','--','--','--','--','--',"+user_id+")";
		console.log(sql);
	    pool.excute(sql,handler);
	},

	// 修改用户信息根据用户id
	repeadInfo: (array,handler) => {
		let sql = "update info set age = "+array[0]+",gender = '"+array[1]+"',birth = '"+array[2]+"',dream_place = '"+array[3]+"',blood_type = '"+array[5]+"',living_place = '"+array[6]+"',birthplace = '"+array[7]+"',profession = '"+array[8]+"',company_name = '"+array[9]+"',marital_status = '"+array[10]+"', detailed_address = '"+array[11]+"' where user_id = "+array[4]+"";
		console.log(sql);
		pool.excute(sql,handler);
	}

}