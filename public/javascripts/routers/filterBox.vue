
<template>
    <div class="filter-box">
        <div class="classification">
            <span class="classification01" @click="search">选择</span>
            <span class="label" classification="0">
                <span class="select" labels_id="推荐">推荐</span><span labels_id="全部">全部</span>
            </span>
        </div>
        <div class='classification' v-for="classification in classifications">
			<span>{{classification.classification_name}}</span>
            <childLabel :id="classification.id"></childLabel>
        </div>
    </div>
</template>
<script>

import $ from 'jquery';
import {scenics} from '../scenic.js';
import childLabel from './childLabel.vue';

var filterBox = {
    name:"filterBox",
    components:{
        childLabel
    },
    data() {
        return {
            input:'',
            select: '',
            classifications:scenics.classifications
        }
    },
    created:() => {
        
    },
    methods:{
        search:() => {
            console.log(filterBox.data().input)
        }
    }
}
export default filterBox;
</script>
