import '../index.html';
import Vue from 'vue/dist/vue.js'
import $ from 'jquery';
import Router from 'vue-router';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '../stylesheets/index.css';
import '../stylesheets/common.css';
import { user } from './config';

import homepage from './routers/homepage.vue';
import scenic from './routers/scenic.vue';
import concourse from './routers/concourse.vue';

Vue.use(ElementUI);
Vue.use(Router);

var routes = [
	{ path: '/', redirect:"/homepage" },
	{ path: '/homepage', component:homepage },
	{ path: '/scenic', component:scenic },
	{ path: '/concourse', component:concourse }
];
var router = new Router({
  	routes:routes
});

window.onload = function () {
	$('.navigation-menu a').click(function (event) {
		$('.one>a').css('color','gray');
		$(event.target).css('color','#20A0FF');
		var s = $(event.target).attr('m');
		s = (s-1)*200+40;
		$('.hr').animate({
			"left":''+s+'px'
		},300);
	});
	let path = window.location.href.split("/")[window.location.href.split("/").length-1]
	$('.'+path).click();
}
new Vue({
	el:'#app',
	router:router,
	data:{
		text:"点击一下进行登录呗",
		input:"",
		select:"中国",
		status:true,
		loginStatus:false,
		formData:{
			name:'',
			password1:'',
			password2:''
		},
		userData:{
			name:'',
			imgSrc:'./11404T243-0.jpg'
		},
		title:"",
		dialogFormVisible:false,
		z_index:"",
		see:false
	},
	methods:{
		enter() {
			const hint = this.$createElement;
			const vm = this;
			$('.login-img').animate({
				"margin-left":'0px'
			},300);
			this.$notify({
			  title: '亲',
			  message: hint('i', { style: 'color: teal'}, vm.text)
			});
		},
		leave(){
			  $('.login-img').css("margin-left","50px");
		},
		login(){
			this.see = false;
			this.title = "登录";
			this.text = "填写一下数据完成操作";
			$(".in").css("margin-top","40px")
			$('.model').css('display','block');
			$('.user-area').animate({
				"left":'0px'
			},100,"swing");
		},
		register(){
			var vm = this;
			$('.model').css('display','block');
			$('.user-area').animate({
				"left":'-480px'
			},100,"swing",function(){
				vm.title = "注册";
				vm.see = true;
				$(".in").css("margin-top","0px")
				$('.user-area').animate({
					"left":'0px'
				},100,"swing");
			});
		},
		repead(){
			var vm = this;
			$('.model').css('display','block');
			$('.user-area').animate({
				"left":'-480px'
			},100,"swing",function(){
				vm.title = "重置密码";
				vm.see = true;
				$(".in").css("margin-top","0px")
				$('.user-area').animate({
					"left":'0px'
				},100,"swing");
			});
		},
		alert(){
			this.$message({
				  message: "请登录后操作！",
				  type: 'warning'
			});
		},
		close(){
			this.text = "点击一下进行登录";
			this.formData = {
				name:'',
				password1:'',
				password2:''
			};
			$('.model').css('display','none');
			$('.user-area').animate({
				"left":'-480px'
			},100,"swing");
		},
		submit(){
			var vm = this;
			console.log(vm.formData)
			if(vm.title === "登录"){
				if(user.judgeLogin(vm.formData)){
					vm.$message({
			          	message: user.judgeLogin(vm.formData),
			          	type: "warning"
		        	});					
				}else{
					user.login(vm.userdata).then(info => {
						return new Promise((resolve,reject) => {
							if(info.status == 1)
								resolve();
							else
								reject();			
						}).then(() => {
							vm.$message({
								message: info.hint,
								type: "success"
							});
							vm.close();
						},() => {
							vm.$message({
					          	message: info.hint,
					          	type: "error"
				        	});							
						});	
					});
				}
			}else{
				if(user.judge(this.form)){
					this.$message({
			          	message: user.judge(this.form),
			          	type: "warning"
		        	});					
				}else{
					user.handle(this.title,this.form).then(info => {
						if(info.status == 0){
							this.$message({
					          	message: info.hint,
					          	type: "error"
				        	});							
						}else{
							this.$message({
					          	message: info.hint,
					          	type: "success"
				        	});
				        	vm.close();						
						}
					});
				}
			}
		},
		cancel(){
			this.status = true;
			this.loginStatus = false;
			this.$message({
				  message: "注销成功！",
				  type: 'success'
			});
		},
		head(){
			let vm = this;
			let file = document.getElementById("header").files[0];
			let formData = new FormData();
			formData.append("user_name",""+this.userData.name+"");
			formData.append("logo", file);//设置key为avartar,value为上述的File对象
			$.ajax({
				type: 'post',
				url: '/upload/upload-header',
				data: formData,
				processData:false,
				contentType:false,
				success: function (data) {
					var srcArr = data.split(",");
					vm.userData.imgSrc = srcArr[srcArr.length-1];
					vm.$message({
							  message: "更改成功！",
							  type: 'success'
						});
				  },
				  error: function (err) {
					console.log(err.message);
				  }
			})
		},
		en(){
			$("div.two-in .p").css("display","inline-block")
			$('.imgHead').css("color","white");
		},
		out(){
			$("div.two-in .p").css("display","none");
			$('.imgHead').css("color","rgba(0,0,0,0)");
		}
	}
})