$(function(){
	var spurl='/ProjectAudit/projects'
		,apurl='/ProjectAudit/infoPapers'
		,form = layui.form
		,layer = layui.layer
		,currptime;
	
	$.ajax({
	     type : "GET",
	     url : spurl,
	     data : {},
	     contentType : "application/x-www-form-urlencoded",
	     dataType : "json",
	     success : function( jsonData ){
	    	 console.log(jsonData);
	    	 var data = jsonData['_embedded']['projects'];
	    	 $('#pname').empty;
	    	 $.each( data, function( index, item ){
	    		 $('#pname').append(
	    				 ' <option time="'+ item.ptime + '" value="' + item.pname  + '">' + item.pname  + '</option> '
	    		 );
	    		 $('#pid').val(item.pid);
	    	 })    	 
	    	 form.render();
	     },
	     error:function(){
	    	 layer.msg('请求失败：');
	     }		       
	});
	
	form.on('select(itype)', function(data){
		console.log(data.elem); //得到radio原始DOM对象
//		console.log(data.value); //被点击的radio的value值
		$.each( paper[data.value], function(key,value){
			$('#' + key).val(value);
		})
		username = getCookie1("name");
		userid = getCookie1("num");
		userid = userid.substr( 1, username.length-2);
		username = username.substr( 1, username.length-2);
		$('#bperson').val( username + " " + new Date().toLocaleDateString());
		form.render();		
		$('#paperAearActive').show();		
	});  
	
	form.on('select(pname)', function(data){
		console.log(data.elem); //得到radio原始DOM对象
//		console.log(data.value); //被点击的radio的value值		
		currptime = $(data.elem).find( 'option[value=' +data.value+']').attr('time');
		console.log(currptime);
		$('#ptime').val(currptime);
	});  
	
	
	$('#submit').on('click',function(){
		
		$.ajax({
   	   		type: "post",
   	   		url: apurl,
   	   		async:false,
   	   		data: JSON.stringify($('form').serializeObject()),
   	   		contentType: "application/json",
   	   		dataType: "json",	       	     
   	   		success: function(jsonData){
   	   			console.log(jsonData);
   	   			layer.msg('增加项底稿成功',{icon:1});
   	   		},
       	    error:function(){
       	    	layer.msg('请求失败：');
       	    	return false;
       	    }		       
    	});
		return false;
	});
	
	
	
})

