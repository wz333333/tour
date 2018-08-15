// 定义一个方法，将一个某个字符是否按照某种格式存储在一个特殊格式的字符串（以逗号分隔开）当中,如果存在返回true，反之，返回false
var isExit = function (string1,string2) {

	var  returnedValue = false;//初始化一个返回值
	var arr = string2.split(",");

	for (var i = 0; i < arr.length; i++) {
		if(arr[i] === string1){
			returnedValue = true;
			break;
		}
	}
	return returnedValue;
}

// 定义一个方法，根据标签id获取标签值，返回一个数组
var getLabelsById = function (label_ids) {
	var scenicLabels = [];
	var ids = label_ids.split(",");  //将字符串转化为数组

	for (var i = 0; i < ids.length; i++) {
		for (var j = 0; j < labels.length; j++) {
			if(ids[i] == labels[j].id){
				scenicLabels.push(labels[j].label_name);
			}
		}
	}
	return scenicLabels;
}

// 定义一个方法得到获取景区数据
var getScenic = function () {

	// 根据标签值获取景区数据
	var getScenics = [];

	// 标签值为推荐或者全部特殊处理
	if(selectLabel === "推荐" && allScenic){
		for (var i = 0; i < allScenic.length; i++) {
			if(allScenic[i].isRecommend === "true"){
				getScenics.push(allScenic[i]);
			}
		}
	}
	if(selectLabel === "全部" && allScenic){
		getScenics = allScenic;
	}

	//根据标签值获取数据
	for (var i = 0; i < allScenic.length; i++) {
		if(isExit(selectLabel,allScenic[i].label_ids)){
			getScenics.push(allScenic[i]);
		}
	}
	return getScenics;
}


// 定义一个方法加载景区展示
var loadScenic = function (getScenics) {

	//在添加之前先把原有元素清空
	$(".scenic-area").empty();

	if(getScenics.length >= 1){

		for (var i = 0; i < getScenics.length; i++) {
			$(".scenic-area").append("<hr class='hr2'>"+
				"<div class='area'>"+
					"<div class='img-area'><img src='./images/scenic-title/"+getScenics[i].scenic_spot_image+"'></div>"+
					"<div class='text-area'>"+
						"<div class='more'><a class='more-information' href='./"+getScenics[i].scenic_spot_name+"/"+getScenics[i].scenic_spot_name+".html' target='_blank' onclick='return judge()'>了解更多</a></div>"+
						"<div class='text'><span class='scenic-title'>"+getScenics[i].scenic_spot_name+"</span><span class='scenic-text'>"+getScenics[i].scenic_spot_introduce+"</span></div>"+
						"<div class='right-bottom'>"+
							"<div class='scenic-label' label_ids='"+getScenics[i].label_ids+"'><span>标签</span>&nbsp;:&nbsp;"+getLabelsById(getScenics[i].label_ids).join(" ")+"</div>"+
							"<img src='./images/praise.png' class='praise'>"+
							"<span class='praises'>&nbsp;:&nbsp;"+getScenics[i].scenic_spot_praise+"</span>"+
						"</div>"+
					"</div>"+
				"</div>");
		}
	}else{
		$(".scenic-area").append("<div class='miss-area'>"+
			"<div class='miss'><img src='./images/miss.png'><span>未找到相关数据...</span></div>"+
		"</div>");
	}
}

// 通过输入的值在所有景区数据中查找相关数据，并返回一个数组
var findScenicBySerch = function (searchValue,allScenic) {
	var getScenics = []; //初始化数据
	for (var i = 0; i < allScenic.length; i++) {
		if(!(allScenic[i].scenic_spot_name.indexOf(searchValue) == -1)){
			getScenics.push(allScenic[i]);
		}
	}
	return getScenics;
}