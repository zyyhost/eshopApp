//打开窗口
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

//ajax基本方法
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