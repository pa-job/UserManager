$(function(){
	//从cookie 中获取用户角色,用户名字
	/*
	 * 	var user_role=$.cookie('role');
	var name=$.cookie('name');
	 */

	$('#ifra').attr('src','equipmentManager.html');
	if(user_role==2){
		equSrc='equipmentManager.html';
		equCountSrc='';
		$('#ifra').attr('src',equSrc);
	}else{
		equSrc='equipmentManager_commn.html';
		$('#ifra').attr('src',equSrc);
		equCountSrc='';
	};
	//为导航栏添加点击事件
	$('#secondMeno >li').each(function(i,obj){
		if($(this).text()=='设备管理'){
			$('#ifra').attr('src',equSrc)	;		
		}else{
			$('#ifra').attr('src',equCountSrc);
		}
	})
})