$(function(){
	var table=layui.table
	,form=layui.form
	,layer=layui.layer
	,surl='/usermanager/materials'
	,aurl='/usermanager/materials'
	,uurl='/usermanager/user'
	,init = {
			initData: function(){
							
			}
	}
	,cf={};
	username = getCookie1("name");
	username = username.substr( 1, username.length-2);
	userRole = getCookie1("roleNames");
	$('#userName').find('img').after(username);
	
	init.initData();
	
	
	$('#submit').on('click',function(){
		$.ajax({
   	   		type: "post",
   	   		url: aurl,
   	   		data: JSON.stringify($('form').serializeObject()),
   	   		contentType: "application/json",
   	   		dataType: "json",	       	     
   	   		success: function(jsonData){
   	   			console.log(jsonData)
   	   			if( jsonData.mid ){
	        		layer.msg('物资入库成功',{icon:1})
		        	layer.close(index);
   	   			}
   	   		},
       	    error:function(){
       	    	layer.msg('请求失败：');
       	    }		       
    	});
	})
})