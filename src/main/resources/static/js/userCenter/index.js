var element = layui.element,
layer = layui.layer,
logoutUrl = ipPort + "/user/logout",	
roleAuthUrl = ipPort + "/user/role/auths",
roleAuthJsonUrl = ipPort + "/user/auths",
username;
	

$(function(){
	//1h访问一次后台数据
	var returnData;
	setInterval(function(){
		$.getJSON('/usermanager/rfid/info',function(ajaxD){
			 returnData=ajaxD.data;
			if(returnData.length>0){
				layer.open({
			        type: 1,
			        title: '校验'
			        ,area: ['30%', '20%']	        	
			        ,id: 'layerDemo'+ 1 //防止重复弹出
			        ,content: $('#btn-container')
			        ,shade: 0 //不显示遮罩
			        ,cancel: function(index, layero){ 
			        	    layer.close(index);
			        	    $('#btn-container').hide();
			        	} 
			        ,end: function(){
			        	 $('#btn-container').hide();
			        }
			    });
			};
		})
	},1000);
	$('#bt1').click(function(){
		var auth={'A':['A','B','C','D'],'B':['B','C','D'],'C':['B','C','D'],'D':['D']},
		role=$.cookie('role').replace(/\"/g, "");
		if(auth[role].indexOf(returnData[0].area)>-1){
		layer.msg('处于允许的区域');
		}else{
			layer.msg("你处于不被允许的区域");
		}
	});
	$('#bt2').click(function(){
		location.href="?"+returnData;
	});
	$('#bt3').click(function(){
		location.href="?"+returnData;
	});
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