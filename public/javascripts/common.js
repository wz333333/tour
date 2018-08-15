// 判断用户目前是否处于登录状态
var judge = function () {
    if(!$("#user").text()){  
        app1.alert();  
        return false;  
    }  
    return true;  
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

