$(function(){
	var table=layui.table
	,form=layui.form
	,layer=layui.layer
	,surl='/usermanager/materials'
	,aurl='/usermanager/materials'
	,uurl='/usermanager/user/users'
	,person1pwd
	,person2pwd
	,init = {
			initData: function(){}
	}
	,cf={
	};
	username = getCookie1("name");
	username = username.substr( 1, username.length-2);
	userRole = getCookie1("roleNames");
	$('#userName').find('img').after(username);
	
	init.initData();
	
	$('#person1').on( 'blur', function(){
		if( !$('#person1').val() || $.trim( $('#person1').val() ) == ''){
			person1pwd = undefined;
			return ;
		}
		if( $('#person1').val() ){
			if( person2pwd && $('#person1').val() == person2pwd ){
				layer.msg('不能为相同的用户');
				return ;
			}
		}
		layer.prompt({
			  formType: 2,
			  value: '',
			  title: '请输入密码',
			  area: ['300px', '60px'] //自定义文本域宽高
		}, function(value, index, elem){
			  console.log(value); //得到value
			  if( value ){
				  ajax('get',uurl+"/"+$('#person1').val(), {},function(data){
					  console.log(data);
					  if( data ){
						  if( value == data.user_password ){
							  person1pwd = $('#person1').val() ;
							  layer.msg('密码正确');
						  }else{
							  person1pwd = undefined;
							  layer.msg('密码不正确');
						  }
					  }
				  }, false);  
			  }else{
				  layer.msg('密码不正确');
				  person1pwd = undefined;
			  }				  
			  layer.close(index);
		});
	});
	$('#person2').on( 'blur', function(){
		if( !$('#person2').val() || $.trim( $('#person2').val() ) == ''){
			person2pwd = undefined;
			return ;
		}
		if( $('#person2').val() ){
			if( person1pwd && $('#person2').val() == person1pwd ){
				layer.msg('不能为相同的用户');
				return ;
			}
		}
		layer.prompt({
			  formType: 2,
			  value: '',
			  title: '请输入密码',
			  area: ['300px', '60px'] //自定义文本域宽高
		}, function(value, index, elem){
			  console.log(value); //得到value
			  if( value ){
				  ajax('get',uurl+"/"+$('#person1').val(), {},function(data){
					  console.log(data);
					  if( data ){
						  if( value == data.user_password ){
							  person2pwd = $('#person2').val() ;
							  layer.msg('密码正确');
						  }else{
							  person2pwd = undefined;
							  layer.msg('密码不正确');
						  }
					  }
				  }, false);  
			  }else{
				  layer.msg('密码不正确');
				  person2pwd = undefined;
			  }				  
			  layer.close(index);
		});
	});
	
	$('#submit').on('click',function(){
		console.log(person1pwd);
		console.log(person2pwd);
		if( person1pwd && person2pwd ){
			$.ajax({
       	   		type: "post",
       	   		url: aurl,
       	   		data: JSON.stringify($('form').serializeObject()),
       	   		contentType: "application/json",
       	   		dataType: "json",	       	     
       	   		success: function(jsonData){
       	   			console.log(jsonData)
       	   			if( jsonData.mid ){
    	        		layer.msg('增加物资操作成功',{icon:1})
       	   			}
       	   		},
	       	    error:function(){
	       	    	layer.msg('请求失败：');
	       	    }		       
        	});
		}else{
			 layer.msg('请确认是否为双人运输');
		}		
//		return false;
	})
})