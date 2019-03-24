$(function(){
	 	var role=$.cookie('role').replace(/\"/g, "");
	    var name=$.cookie('name');
	 
	    var equSrc='equipmentManager_commn.html';
	    var equCountSrc='';
	   console.log(role==1);
	if(role==2){
		equSrc='equipmentManager.html';
		equCountSrc='';
	};
	$('#ifra').attr('src',equSrc);
	//为导航栏添加点击事件
	$('#secondMeno >li').each(function(i,obj){
		$(this).click(function(){
			if(i==0){
				$('#ifra').attr('src',equSrc);
			}else {
				$('#ifra').attr('src',equCountSrc);
			}
			
		});
	})
})