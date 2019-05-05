$(function(){
	var table=layui.table
	,form=layui.form
	,layer=layui.layer
	,surl='/ProjectAudit/projects'
	,aurl='/ProjectAudit/projects'
	,durl='/ProjectAudit/projects'
	,purl='/ProjectAudit/projects'
	,suurl='/ProjectAudit/user/users'		
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
				    	 var data = jsonData['_embedded']['projects'];
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
									,{field:'pid', title:'主键',  fixed: 'left', hide: true, align:'center'}
							    	,{field:'pnumber', title:'项目号', edit:'text', align:'center'}
							    	,{field:'pname', title:'项目名称',edit:'text',  align:'center'}
							    	,{field:'pmanager', title:'项目经理',  edit: 'text', align:'center'}	           
							    	,{field:'ppartitioner', title:'项目成员',  edit: 'text', align:'center'}
							    	,{field:'ptime', title: '审计时间',edit:'text',edit:'text', align:'center'}
							    	,{field:'prange', title: '审计范围',edit:'text', align:'center'}
							    	,{fixed: 'right', title:'操作', toolbar: '#barDemo', align:'center'}
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
	if(contains(userRole,'客户')){
		$('#add').hide();
		$('#barDemo').remove();
	}
	
	init.initTable();	
	
	table.on('tool(table)', function(obj){
	    var data = obj.data;
	    if(obj.event === 'del'){
	    	cf.del( data );
	    } else if(obj.event === 'save'){
	    	cf.save( data );	   
	    }
	})
	
	form.on('checkbox(ppartitioner1)', function(data){
//		console.log(data.elem); //得到checkbox原始DOM对象
//		console.log(data.elem.checked); //是否被选中，true或者false
//		console.log(data.value); //复选框value值，也可以通过data.elem.value得到
//		console.log(data.othis); //得到美化后的DOM对象
		console.log($('#ppartitioner1a').find('.layui-form-checked').text());
		$('#ppartitioner').val($('#ppartitioner1a').find('.layui-form-checked').text())	;	
	});   
		
	$('#add').on('click',function(){
		layer.open({
	        type: 1,
	        title: '新增项目'
	        ,area: ['40%', '60%']	  
	        ,id: 'layerDemo'+ 1 //防止重复弹出
	        ,content: $( '#addArea' )
	        ,btn: ['确定', '取消']
	        ,btnAlign: 'c' //按钮居中
	        ,shade: 0 //不显示遮罩
	        ,yes: function( index, layero){
	        	console.log(layero); 
	        	console.log($(layero).find('form').serializeObject());
	        	$.ajax({
	       	   		type: "post",
	       	   		url: aurl,
	       	   		data: JSON.stringify($(layero).find('form').serializeObject()),
	       	   		contentType: "application/json",
	       	   		dataType: "json",	       	     
	       	   		success: function(jsonData){
	       	   			console.log(jsonData)
	       	   			if( jsonData.pnumber ){
	    	        		layer.msg('增加项目成功',{icon:1})
	    		        	init.initTable();		        	
	    		        	init.hideElem();
	    		        	layer.close(index);
	       	   			}
	       	   		},
		       	    error:function(){
		       	    	layer.msg('请求失败：');
		       	    }		       
	        	});
	        },
	        btn2: function(index, layero){
	            layer.close(index);
	            init.hideElem();
	        },
	        end: function(){
	        	init.hideElem();
	        },
	        success: function( layero, index ){    	 
	        	ajax('get',suurl,{},function(data){
	        		$('#pmanager').empty();
	        		$('#ppartitioner1a').empty();
	        		$.each( data, function(index,item){
	        			$('#pmanager').append(
		        				' 	<option value="' + item.usernum + '">' +  item.name + '</option> ' 
		        		);
	        			$('#ppartitioner1a').append(
		        				'<input type="checkbox"  lay-filter="ppartitioner1" name="ppartitioner1" title="'+ item.name +' ">'
		        		);
	        		})    
	        		form.render();
	        	})
	        	
	        }
    	}) 
	})
	
})