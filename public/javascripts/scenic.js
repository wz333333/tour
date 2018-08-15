

import $ from 'jquery';

let scenics = {
	labels:{},
	classifications:{},

	_getLabel:() => {
		$.ajax({
			type:"post",
			async:false,
			url:"/scenic/findAllLabel",
			success: data => {
				scenics.labels = data;
			},
			error: () => {
				alert("系统异常!");
			}
		});
	},
	_getClassification:() => {
		$.ajax({
			type:"post",
			async:false,
			url:"/scenic/findAllClassification",
			success: data => {
				scenics.classifications = data;
			},
			error: () => {
				alert("系统异常!");
			}
		});
	},
	_init:() => {
		scenics._getClassification();
		scenics._getLabel();
	}
}

scenics._init();


export {scenics};



