$(function(){
	var table=layui.table
	,form=layui.form
	,layer=layui.layer
	,surl='/usermanager/materialhistorys'
	,init = {
			hideElem:function(){			
				$( '#addArea' ).hide();
			}
			,initTable: function(){
				$.ajax({
				     type : "GET",
				     url : surl,
				     data : {},
				     contentType : "application/x-www-form-urlencoded",
				     dataType : "json",
				     success : function( jsonData ){
				    	 console.log(jsonData);
				    	 var data = jsonData['_embedded']['materialhistorys'];
				    	 if( data ){
				    		 table.render({
								elem : '#table',
//								height : '400ox',
								title: '用户数据表',
								data : data,
//								toolbar: true,
								page : true,
								even : true,			
								autoSort : false,
								count : data.length,
								curr : 0,
								limit : 10,
								limits : [ 10, 13, 20, 25, 30 ],
								layout : [ 'prev', 'page', 'next', 'skip',
										'count', 'limit' ],
								cols : [ [
									{type: 'numbers',title:'序号', align:'center'}
									,{field:'mhid', title:'主键', hide: true, align:'center'}
									,{field:'mid', title:'物资主键', hide: true, align:'center'}
									,{field:'material["name"]', title:'物资名称',  align:'center'}
									,{field:'number', title:'物资数量',  align:'center'}
							    	,{field:'time', title:'搬运时间',  align:'center'}
							    	,{field:'tflaginout', title:'物资进出',  align:'center'}
							    	,{field:'aera', title:'物资区域',   align:'center'}	           
							    	,{field:'busrfid', title:'车辆rfid',   align:'center'}
							    	,{field:'person1', title: '搬运人1', align:'center'}
							    	,{field:'person2', title: '搬运人2', align:'center'}
							    	,{field:'note', title: '信息', align:'center'}
								] ],
								id: 'testReload',
								done : function(res, curr, count) {
								}
							}); 
				    	 }else{
				    		 layer.msg('查询数据失败');
				    	 }
				    	 
				     },
				     error:function(){
				    	 layer.msg('请求失败：');
				     }		       
				});
			}
	}
	,cf={
			save: function(data){
				console.log('-----save------');
				console.log(data);
				$.ajax({
	       	   		type: "put",
	       	   		url: purl + '/' + data.pnumber,
	       	   		data: JSON.stringify(data),
	       	   		contentType: "application/json",
	       	   		dataType: "json",	       	     
	       	   		success: function(jsonData){
	       	   			console.log(jsonData);
	       	   			if( jsonData.pnumber == data.pnumber){
	       	   				layer.msg('修改成功');
	       	   			}       	   			
	       	   		},
		       	    error:function(){
		       	    	layer.msg('请求失败：');
		       	    }		       
	        	});
			}
			,del: function(data){
				console.log('-----del------');
				console.log(data);
//				ajax('delete',durl + "/" + data.pid,{},function(jsonData){
//					console.log(jsonData);			
//				})
				$.ajax({
				     type : "delete",
				     url : durl + "/" + data.pid,
				     data : data,
				     contentType : "application/x-www-form-urlencoded",
				     dataType : "json",
				     success : function( jsonData ){
				    	 console.log(jsonData)	
				    	 layer.msg('删除成功');
				    	 init.initTable();
				     },
				     error:function(){
				    	 layer.msg('请求失败：');
				     }		       
				});
			}
	}
	username = getCookie1("name");
	username = username.substr( 1, username.length-2);
	userRole = getCookie1("roleNames");
	$('#userName').find('img').after(username);
	
	init.initTable();	
	
})