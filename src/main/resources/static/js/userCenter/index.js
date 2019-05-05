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
	userRole = getCookie1("roleNames");
	$('#userName').find('img').after(username);
	
	//从cookie 中获取用户角色,用户名字
 	var role=$.cookie('role').replace(/\"/g, "");
    console.log(userRole);
	if(contains(userRole,'客户')){
		$('#project').show();
		$('#paper').show();
	}else if( contains(userRole,'编制') ){
		$('#project').show();
		$('#paperadd').show();
	}else if( contains(userRole,'一级') ){
		$('#project').show();
		$('#paper').show();
	}else if( contains(userRole,'二级') ){
		$('#project').show();
		$('#paper').show();
	}else if( contains(userRole,'三级') ){
		$('#project').show();
		$('#paper').show();
	}else if( contains(userRole,'管理员') ){
		$('#role').show();
		$('#user').show();
	}
	//为导航栏添加点击事件
	$('#secondMeno >li').each(function(i,obj){
		$(this).click(function(){
			$('#ifra').attr('src', $(this).attr('url') );
		});
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