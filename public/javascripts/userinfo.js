
var getInfo = function () {
	if($("#user").text()){
		var form = {
			user_name:$("#user").text()
		}
		app.user_name = $("#user").text();
		$.post("/user/getInfo",form,function (data) {
			if(data[0]){
				app.userData = data[0];
			}
			$.post("/user/getDataByUser_name",form,function (result) {
				result[0].avatar = result[0].avatar.split(",");
				app.userData.user_id = result[0].id;
				app.imgSrc = result[0].avatar[result[0].avatar.length-1];
				if(result[0].avatar.length > 1){
					for (var i = 0; i < result[0].avatar.length-1; i++) {
						$(".img-area").empty();
						$(".img-area").append("<img src='"+result[0].avatar[i]+"'>");
					}
				}
			})
		})
	}
}
getInfo();

app1.submit = function () {
	if(app1.title === "登录"){
		if(!app1.formData.name == ''){
			if(!app1.formData.password1 == ''){
				$.post('/user/login',app1.formData,function(data){
					if(data.user_name === app1.formData.name){
						app1.$message({
				          	message: "登录成功！",
				          	type: 'success'
				        });
				        app1.loginStatus = true;
				        app1.status = false;
				        app1.userData.name = data.user_name;
        				app1.userData.imgSrc = data.avatar.split(",")[data.avatar.split(",").length-1];
				   		app1.close();
				   		var form = {
							user_name:data.user_name
						}
						app.user_name = data.user_name;
						app.userData.user_id = data.id;
						$.post("/user/getInfo",form,function (results) {
							$(".area").css("display","block");
							$(".hid").css("display","none");
							if(results[0]){
								app.userData = results[0];
							}
							data.avatar = data.avatar.split(",");
							app.imgSrc = app1.userData.imgSrc;
						})
				    }else{
				      	app1.$message({
				          	message: data,
				          	type: 'error'
				        });
				    }
				});
			}else{
				app1.$message({
          			message: '密码不能为空！',
          			type: 'warning'
       			});
			}
		}else{
			app1.$message({
      			message: '用户名不能为空！',
      			type: 'warning'
   			});
		}
	}else if(app1.title === "注册"){
		app1.one();
	}else if(app1.title === "重置密码"){
		app1.two();
	}
}

app1.cancel = function () {
	app1.status = true;
	app1.loginStatus = false;
	app1.$message({
      	message: "注销成功！",
      	type: 'success'
    });
    $(".area").css("display","none");
	$(".hid").css("display","block");
},

$(".repeadInfo input").click(function (event) {
	$(event.target).val("");
});
$(".repeadInfo input").blur(function (event) {
	if(!$(event.target).val()){
		$(event.target).val("--");
	}
});
$(".put-class").click(function (event) {
	$(".info-see").css("display","block");
	$(".repeadInfo").css("display","none");
	getInfo();
})