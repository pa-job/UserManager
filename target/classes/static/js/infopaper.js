$(function(){
	var spurl='/ProjectAudit/projects'
		,siurl='/ProjectAudit/infoPapers'
		,apurl='/ProjectAudit/infoPapers'
		,form = layui.form
		,layer = layui.layer
		,username = getCookie1("name")
		,role = getCookie1("roleNames")
		,currIid;
	username = username.substr( 1, username.length-2);
	$('#bperson').val( username + " " + new Date().toLocaleDateString());
	
	$.ajax({
	     type : "GET",
	     url : spurl,
	     data : {},
	     async: false,
	     contentType : "application/x-www-form-urlencoded",
	     dataType : "json",
	     success : function( jsonData ){
	    	 console.log(jsonData);
	    	 var data = jsonData['_embedded']['projects'];
	    	 $('#pname').empty;
	    	 $('#pid').empty;
	    	 $.each( data, function( index, item ){
	    		 $('#pname').append(
	    				 ' <option flag="'+ item.pid+'" value="' + item.pname  + '">' + item.pname  + '</option> '
	    		 );
	    	 })    	 
	    	 form.render();
	     },
	     error:function(){
	    	 layer.msg('请求失败：');
	     }		       
	});
	form.render();
	
	form.on('select(pname)', function(data){
//		console.log(data.elem); //得到radio原始DOM对象
		console.log(data); //被点击的radio的value值
		$('#pid').val( data.flag );
		form.render();
		$.ajax({
		     type : "GET",
		     url : siurl + '/search/pname',
		     data : {"pname":data.value },
		     contentType : "application/x-www-form-urlencoded",
		     dataType : "json",
		     success : function( jsonData ){
		    	 console.log(jsonData);
		    	 $.each( jsonData, function( key, value ){
		    		 if( $.trim(key) == 'iresult2'){
		    			 $('#'+key).find('option[value=' + value +']').attr('selected',true);
		    			 return true;
		    		 }else if($.trim(key) == 'iresult4'){
		    			 $('#'+key).find('option[value=' + value +']').attr('selected',true);
		    			 return true;
		    		 }else if( $.trim(key) == 'iid' ){
		    			 currIid = value;
		    			 return true;
		    		 }
		    		 $('#'+key ).val(value);
		    		 $('#'+key ).attr('readonly',true);
		    	 })    	
		    	 $('#paperAearActive').show();
		    	 form.render();
		    	 if(contains(role,'复核')){
		    		 $('#noteArea').show();
		    	 }
		    	
		     },
		     error:function(){
		    	 layer.msg('请求失败：');
		     }		       
		});
			
	});  
	
	form.render();
	
	$('#submit').on('click',function(){
		var key = '',keyTime = '';;
		if(contains(role,'一级')){
			key = 'f'+'note';
			keyperson = 'f'+'person';
			keyTime = 'f'+'time';
		}else if(contains(role,'二级')){
			key = 's'+'note';
			keyperson = 's'+'person';
			keyTime = 's'+'time';
		}else if(contains(role,'三级')){
			key = 't'+'note';
			keyperson = 't'+'person';
			keyTime = 't'+'time';
		}else{
			
		}
		console.log(key);
		var data={},nowdate=new Date().toLocaleDateString();
		data[key]=$('#note').val();
		data[keyTime]=nowdate;
		data[keyperson]=username + " " + nowdate;
		$.ajax({
   	   		type: "patch",
   	   		url: apurl + '/' + currIid,
   	   		async:false,
   	   		data: JSON.stringify(data),
   	   		contentType: "application/json",
   	   		dataType: "json",	       	     
   	   		success: function(jsonData){
   	   			console.log(jsonData);
   	   			layer.msg('增加批注成功',{icon:1});
   	   		},
       	    error:function(){
       	    	layer.msg('请求失败：');
       	    	return false;
       	    }		       
    	});
		return false;
	});
	form.render();
	
	
	
})

