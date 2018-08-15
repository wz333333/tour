<template>
<section>
    <div class="area">
        <div class="left-area"  id="message-area">
            <div class="slideshow">
				<div class="slideshow-area">
					<div class="slideshow-img">
						<div class="img-text">就是喜欢和你在一起旅行</div>
					</div><div class="slideshow-img">
						<div class="img-text">来一场说走就走的旅行</div>
					</div><div class="slideshow-img">
						<div class="img-text">只想进行一场漫无目的的旅行</div>
					</div><div class="slideshow-img">
						<div class="img-text">我们终将手牵手一起走</div>
					</div>
				</div>
				<div class="slideshow-botton">
					<div m="1" id="botton-one"></div>
					<div m="2"></div>
					<div m="3"></div>
					<div m="4"></div>
				</div>
			</div>
			<div class="message-search">
				<input type="search" placeholder="大家都在搜：三亚">
				<a class="search-two"><img src="../../images/search.png" class="search-png"></a>
			</div>
			<div class="top">
				<div class="message-top"><img src="../../images/refresh.png" class="refresh-img"></div>
			</div>
        </div>
        <div class="right-area" id="right-area">
			<div class="messages">
				<input type="text" placeholder="分享你的点滴..." class="messages-in" @click="open">
			</div>
		</div>
    </div>
    <div class="messages-info"  id="upload">
	<div class="model2"></div>
	<div class="informations">
		<div class="close"><img src="../../images/close.png" alt="" @click="close"></div>
		<textarea id="" cols="30" rows="10" placeholder="说点什么吧" v-model="formData.info"></textarea>
		<div class="in-label">
			<el-tag
			  :key="tag"
			  v-for="tag in dynamicTags"
			  closable
			  :disable-transitions="false"
			  @close="handleClose(tag)">
			  {{tag}}
			</el-tag>
			<el-input
			  class="input-new-tag"
			  v-if="inputVisible"
			  v-model="inputValue"
			  ref="saveTagInput"
			  size="small"
			  @keyup.enter.native="handleInputConfirm"
			  @blur="handleInputConfirm"
			>
			</el-input>
			<el-button v-else class="button-new-tag" size="small" @click="showInput">+&nbsp;&nbsp;标签</el-button>
		</div>
		<button class="button" @click="publish">发表</button>
		<div class="upload">
			<el-upload class="upload-demo" action="http://localhost:3000/upload/upload-files" list-type="picture">
  				<el-button size="small" type="primary" @click="submit">点击上传</el-button>
  				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>
	</div>
	
    </div>
</section>
</template>
<script>

import $ from 'jquery';

let image1 = require("../../images/search.png");
let image2 = require("../../images/search2.png");
let image3 = require("../../images/refresh.png");
let image4 = require("../../images/refresh2.png");

// 轮播图动画
$("body").on("click",'.slideshow-botton>div',function (event) {
	$('.slideshow-botton div').css('background','white');
	$(event.target).css('background','#FF8247');
	var s = $(event.target).attr('m');
	s = (s-1)*700;
	$('.slideshow-area').animate({
		"margin-left":'-'+s+'px'
	},300);
});

// 搜索框小图标变色
$("body").on("mousemove",".search-png",function (event) {
	$('.search-png').attr("src",image2)
});
$("body").on("mouseout",".search-png",function (event) {
	$('.search-png').attr("src",image1)
});

// 刷新按钮
$("body").on("mousemove",'.refresh-img',function (event) {
	$('.refresh-img').attr("src",image4)
});
$("body").on("mouseout",'.refresh-img',function (event) {
	$('.refresh-img').attr("src",image3)
});

// 关闭框旋转动画
$("body").on("mousemove",'.close',function (event) {
	$(this).addClass("close-box-begin");
});
$("body").on("mouseout",'.close',function (event) {
	$(this).removeClass("close-box-begin");
});

let concourse = {
    data:() => ({
        user_name:"123",
        dynamicTags: [],
        inputVisible:false,
        inputValue:"",
        formData:{
            info:"",
            labels:"",
            time:"",
            user_name:"",
            imgSrc:''
        }
    }),
    methods:{
        submit(){

        },
        publish(){

        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag),1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        handleRemove(file) {
            console.log(file.name);
        },
        handlePreview(file) {
            console.log(file);
        },
        close(){
            $("#upload").css("display","none");
        },
        open(){
            // this.user_name = $("#user").text();
            if(this.user_name){
                $("#upload").css("display","block");
            }else{
                this.$message({
                    message: "请登录后操作！",
                    type: 'warning'
                });
            }
        }
    }
}
export default concourse;
</script>

<style>
    @import '../../stylesheets/concourse.css';
    @import '../../stylesheets/animate.css';
</style>

