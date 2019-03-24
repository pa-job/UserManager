var element = layui.element,
layer = layui.layer,
logoutUrl = ipPort + "/user/logout",	
roleAuthUrl = ipPort + "/user/role/auths",
roleAuthJsonUrl = ipPort + "/user/auths",
username;
	

$(function(){
	
	/*
	 * 加载用户名
	 */
	//获取usernum
	username = getCookie1("name");
	username = username.substr( 1, username.length-2);
	console.log(username);
	$('#userName').find('img').after(username);
	
	//从cookie 中获取用户角色,用户名字
	/*
	 * 	var user_role=$.cookie('role');
	var name=$.cookie('name');
	 */

	$('#ifra').attr('src','equipmentManager.html');
//	if(user_role==2){
//		equSrc='equipmentManager.html';
//		equCountSrc='';
//		$('#ifra').attr('src',equSrc);
//	}else{
//		equSrc='equipmentManager_commn.html';
//		$('#ifra').attr('src',equSrc);
//		equCountSrc='';
//	};
	//为导航栏添加点击事件
	$('#secondMeno >li').each(function(i,obj){
		if($(this).text()=='设备管理'){
			$('#ifra').attr('src',equSrc)	;		
		}else{
			$('#ifra').attr('src',equCountSrc);
		}
	})
	

	//退出事件绑定	
	$('#logout').on('click', logoutCallBack );
	
	
	
	
})

/**
 * 退出事件绑定回调函数
 * @type 
 */
function logoutCallBack(){
	console.log( '----------退出事件绑定回调函数----------');
	//关闭链接请求
	$.ajax({
	    url: logoutUrl,
	    type: 'post',
	    data: {},
	    dataType: 'json',
	    success: function (jsonData) {
	    	console.log( jsonData );
	        if (jsonData.state == 302) {
	            location.href = ipPort +  jsonData.data;
	        }else{
	        	layer.msg("登出失败", {icon:2});
	        }
	    }
	});      
	return false;
}