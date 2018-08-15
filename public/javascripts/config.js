import $ from 'jquery';

const bases = require('../jsons/base.json');

let translation = msg => {

    var msgstr = bases[msg];

    if (typeof (msgstr) == 'undefined')
        return msgid;
    else if (typeof (msgstr) == 'string')
        return msgstr;
};

let user = {
	judge : (datas) => {
			if(datas.name.length < 3 || datas.name.length > 11){
				return translation("username-cannot-less-3-or-greater-11");
			}
			if(datas.password1.length < 6 || datas.password1.length > 18){
				return translation("password-cannot-less-6-or-more-18");	
			}
			if(/\s/gi.test(datas.name)){
				return translation("username-cannot-blank");
			}
			if(/[\s\u4e00-\u9fa5]/gi.test(datas.password1)){
				return translation("password-cannot-blank-or-Chinese");
			}
			if(datas.password1 != datas.password2){
				return translation("passwords-not-match");
			}
			return false;
	},

	handle : (title,datas) => {
		return new Promise((resolve,reject) => {
			if( title == "注册"){
				resolve(datas);
			}else{
				reject(datas);
			}		
		}).then(data => {
			return user._register(data);
		},data => {
			return user._repead(data);
		});
	},

	_repead : (datas) => {
			return new Promise((resolve,reject) => {
				$.post('/user/repead',datas,data => {
						resolve(data.status);
				});				
			}).then(data => {
				if(data == 1){
					return {
						hint:translation("modify-successfully"),
						status:1
					};
			    }else{
			      	return {
						hint:translation("user-not-exist"),
						status:0
					};
			    }			
			});	
	},

	_register : (datas) => {
			return new Promise((resolve,reject) => {
				$.post('/user/register',datas,data => {
						resolve(data.status);
				});				
			}).then(data => {
				if(data == 1){
					return {
						hint:translation("registered-successfully"),
						status:1
					};
			    }else{
			      	return {
						hint:translation("user-existed"),
						status:0
					};
			    }			
			});
	},

	judgeLogin : (datas) => {
			if(datas.name == ''){
				return translation("username-cannot-empty");			
			}
			if(datas.password == ''){
				return translation("password-cannot-empty");				
			}
			return false;
	},

	login: (datas) => {
			return new Promise((resolve,reject) => {
				$.post('/user/login',datas,data => {
						resolve(data.status);
				});			
			}).then(data => {
				if(data == 1){
					return {
						hint:translation("login-successfully"),
						status:1
					};
			    }else if(data == 0){
			      	return {
						hint:translation("user-not-exist"),
						status:0
					};
			    }else{
			    	return {
						hint:translation("wrong-password"),
						status:2
					};
			    }					
			});
	}
};
export {user};