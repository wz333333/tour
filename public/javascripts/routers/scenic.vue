
<template>
    <section>
        <div class="search-box">
            <el-input placeholder="请输入景点名称" v-model="input">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="中国" value="1"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search" style="width: 80px;"></el-button>
            </el-input>
        </div>
        <filterBox></filterBox>
        <div class="scenic-area" v-for="data in scenicDatas">
            <hr class='hr2'>
            <div class='area'>
                <div class='img-area'><img :src="data.img"></div>
                <div class='text-area'>
                    <div class='text'><span class='scenic-title'>{{data.name}}</span><span class='scenic-text'>{{data.introduce}}</span></div>
                    <div class='right-bottom'>
                        <div class='scenic-label'><span>标签&nbsp;:&nbsp;</span>{{data.labels}}</div>
                        <img src='../../images/praise.png' class='praise'>
                        <span class='praises'>&nbsp;:&nbsp;{{data.fonts}}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
</template>

<script>

import $ from 'jquery';
import filterBox from './filterBox.vue';

let scenicDatas = require('../../jsons/scenic.json').scenic;

// 动态改变图片路径
scenicDatas.forEach(function(item){
    item.img = require('../../images/scenic/'+item.img);
});

let datas = {
        input:'',
        select: '中国',
        scenicDatas:scenicDatas.filter(item => item.isRecommend),
        selectLabel:""
    }

let scenic = {
    name:"scenic",
    components:{
        filterBox
    },
    created:() => {
        
    },
    data:() => datas,
    methods:{
        search:() => {
           scenic.data().scenicDatas = scenic.data().scenicDatas.filter(item => item.name == scenic.data().input);
        }
    }
}

let selectLabel = "推荐";

let getData = function(selectLabel){
    if(selectLabel == "推荐")
        return scenicDatas.filter(item =>　{
            return item.isRecommend;
        });
    if(selectLabel == "全部")
        return scenicDatas;
    return scenicDatas.filter(item =>　{
        return item.labels.split(" ").some(it => {
            return it == selectLabel
        });
    });
}

$("body").on("click",".label span",function (event) {
	$(".label span").removeClass("select");
    $($(event.target)).addClass("select");
    datas.selectLabel = $($(event.target)).text();
    datas.scenicDatas = getData(datas.selectLabel);
    datas.input = "";
});

export default scenic;
</script>

<style>
  @import '../../stylesheets/scenic.css';
</style>