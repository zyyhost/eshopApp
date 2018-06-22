/**
 * 封装打开窗口
 * @param {Object} url 页面路径
 * @param {Object} id 页面id
 * @param {Object} data 数据
 */
function openWindow(url, id, data) {
	mui.openWindow({
		url: url,
		id: id,
		preload: true,
		show: {
			aniShow: 'pop-in'
		},
		styles: {
			popGesture: 'hide'
		},
		extras: data,
		waiting: {
			autoShow: false
		}
	});
}

//ajax封装方法
function ajax(url, data, callback) {
	mui.plusReady(function() {
		mui.ajax(url, {
			data: data,
			type: 'post',
			timeout: 10000,
			dataType: 'json',
			beforeSend: function() {
				plus.nativeUI.showWaiting("请稍后...");
			},
			success: function(res) {
				plus.nativeUI.closeWaiting();
				callback(res);
			},
			error: function(xhr, type, errorThrown) {
				callback(null);
				plus.nativeUI.closeWaiting();
				mui.toast("出现异常:" + type);

			}
		});
	});
}

//格式化金额工具方法
function formatNum(str) {
	var newStr = "";
	var count = 0;

	if(str.indexOf(".") == -1) {
		for(var i = str.length - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr;
			}
			count++;
		}
		str = newStr + ".00"; //自动补小数点后两位
		console.log(str)
	} else {
		for(var i = str.indexOf(".") - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
			} else {
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			}
			count++;
		}
		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
		return str;
	}
}

//js精确加减乘除
//加    
function utilFloatAdd(arg1,arg2){    
     var r1,r2,m;    
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
     m=Math.pow(10,Math.max(r1,r2));    
     return (arg1*m+arg2*m)/m;    
}    

//减    
function utilFloatSub(arg1,arg2){    
    var r1,r2,m,n;    
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
    m=Math.pow(10,Math.max(r1,r2));    
    //动态控制精度长度    
    n=(r1>=r2)?r1:r2;    
    return ((arg1*m-arg2*m)/m).toFixed(n);    
}    
       
//乘    
function utilFloatMul(arg1,arg2)   {     
    var m=0,s1=arg1.toString(),s2=arg2.toString();     
    try{m+=s1.split(".")[1].length}catch(e){}     
    try{m+=s2.split(".")[1].length}catch(e){}     
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);     
}     
      
      
//除   
function utilFloatDiv(arg1,arg2){     
      var t1=0,t2=0,r1,r2;     
      try{t1=arg1.toString().split(".")[1].length}catch(e){}     
      try{t2=arg2.toString().split(".")[1].length}catch(e){}     
        
      r1=Number(arg1.toString().replace(".",""));  
   
      r2=Number(arg2.toString().replace(".",""));     
      return (r1/r2)*Math.pow(10,t2-t1);     
}  


/**
 * 使用jquery的inArray方法判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr,value){
    var index = $.inArray(value,arr);
    if(index >= 0){
        return true;
    }
    return false;
}