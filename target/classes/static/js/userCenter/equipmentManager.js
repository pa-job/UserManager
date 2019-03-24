$(function() {
				//初始化树组件
				var setting = {
					view : {
						dblClickExpand : false,
						showLine : false
					},
					data : {
						key : {
							name : 'typeName'
						},
						simpleData : {
							enable : true,
							idKey : "typeId",
							pIdKey : "parentId",
							rootPId : 0
						}
					},
					callback : {
						onClick : zTreeOnClick
					},
					check : {
						enable : true,
						chkStyle : "radio",
						chkboxType : {
							"Y" : "ps",
							"N" : "s"
						}
					}
				};
	
				//动态请求获取
				$.getJSON('/EquipmentManage/equ/getEquTypes', function(ajaxData) {
					var zNodes = ajaxData.data;
					zTreeObj = $.fn.zTree.init($("#equType"), setting, zNodes);
					var treeObj = $.fn.zTree.getZTreeObj("equType");
					treeObj.expandAll(true);
				});
				//初始化表格
				var table = layui.table, typeId = null, equState = null, layer = layui.layer, laypage = layui.laypage
				form = layui.form, element = layui.element;
				var tableIns = table.render({
					toolbar : '#tool',
					elem : '#equInfo',
					url : '/EquipmentManage/equ/getAllEqusByCondition',
					cellMinWidth : 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
					,
					loading : true,
					limit:5,
					limits:[5,10,15,20],
					page : true,
					cols : [ [ {
						type : 'checkbox'
					}, {
						field : 'equId',
						title : '设备id',
						hide : true
					}, {
						field : 'typeId',
						title : '分类id',
						hide : true
					}, {
						field : 'equName',
						title : '设备名字'
					}, {
						field : 'equCode',
						title : '设备编码',
						sort : true
					}, {
						field : 'equInTime',
						title : '入库时间',
						sort : true
					}, {
						field : 'equState',
						title : '设备状态',
						templet : '#equState'
					}, {
						field : 'userName',
						title : '申请人',
						align : 'center'
					}, {
						fixed : 'right',
						width : 165,
						align : 'center',
						toolbar : '#barDemo'
					} ] ]
				});
				//为树节点添加单击事件
				function zTreeOnClick(event, treeId, treeNode) {
					if (treeNode.parentId == 0) {
						return;
					} else {
						$('span').removeClass('radio_true_full');
						$("a[title='" + treeNode.typeName + "']").prev('span')
								.addClass('radio_true_full');
						typeId = treeNode.typeId;
						table.reload('equInfo', {
							where : {
								typeId : typeId
							}
						})
					}
				}
				//表格头工具事件简单封装
				var toolbarAction = {
					openLayer : function() {
						layer.open({
							type : 1,
							closeBtn : 0,
							content : $('#popUpdateTest'),
							offset : 'auto',
							area : [ '400px', '480px' ],
							cancel : function() {
								$('#popUpdateTest').hide();
							},
							success : function(layero) {
								var mask = $(".layui-layer-shade");
								mask.appendTo(layero.parent());
								//其中：layero是弹层的DOM对象
								element.init();
								form.render();
							}
						});
					}
				};
				//监听表单提交事件
				$('.cancel').click(function() {
					$('.equCode').focus();
					$('form')[0].reset();
					layer.closeAll();
					$('#popUpdateTest').hide();
					
				})
				
				form.on('submit(formSubmit)', function(data) {
					$.ajax({
						url : '/EquipmentManage/equ/addOrUpdateEqu',
						data : $('.role-form').serialize(),
						dataType : 'json',
						success : function(data) {
							if(data.state==0){
								layer.closeAll();
								$('#popUpdateTest').hide();
								$(".layui-laypage-btn")[0].click();
							}else{
								layer.msg("请检查设备名称或者设备编码是否重复");
							}
						
						},
						error : function() {
							layer.msg("请检查设备名称或者设备编码是否重复");
						}
					});
					return false;
				});
	
				function setFormVal(el, data) {
					for ( var p in data) {
						el.find(":input[name='" + p + "']").val(data[p]);
					}
				}
				;
				table.on('toolbar(test)',function(obj) {
									var checkStatus = table
											.checkStatus(obj.config.id), data = checkStatus.data; //获取选中的数据
									switch (obj.event) {
									case 'add':
										$('form')[0].reset();
										toolbarAction.openLayer();
										var date = new Date();
										var time = date.getFullYear() + '-'
												+ (date.getMonth() + 1) + '-'
												+ date.getDate() + ' '
												+ date.getHours() + ':'
												+ date.getMinutes() + ':'
												+ date.getSeconds();
										$('input[name="equInTime"]').val(time)
										if($('input[name="equInTime"]').val()){
											$('input[name="equInTime"]').attr("disabled",false);
										}
										break;
									case 'edit':
										if (data.length === 0) {
											layer.msg('请选择一行');
										} else if (data.length > 1) {
											layer.msg('只能同时编辑一个');
										} else {
											//获取选中数据
											var checkStatus = table.checkStatus('equInfo'), data = checkStatus.data;
											if (data.length == 1) {
												toolbarAction.openLayer();
												$('form')[0].reset();
												setFormVal($('.role-form'), data[0]);
	
											} else if (data.length > 1) {
												layer.msg("不能同时编辑多条数据", {
													icon : 5
												});
											} else if (data.length < 1) {
												layer.msg("请选中一条数据", {
													icon : 5
												});
											}
	
										}
										break;
									case 'delete':
										if (data.length === 0) {
											layer.msg('请选择一行');
										} else {
											layer
													.confirm(
															'是否确认删除多条设备？',
															{
																icon : 3,
																title : '提示'
															},
															function(index) {
																var arr = [];
																$
																		.each(
																				data,
																				function(
																						i,
																						item) {
																					arr
																							.push(item.equId)
																				});
																$
																		.get(
																				'/EquipmentManage/equ/deleteEquBaseInfo',
																				{
																					'list' : arr
																				},
																				function(
																						ajaxData) {
																					if (ajaxData.state == 0) {
																						layer
																								.msg(
																										"数据删除成功",
																										{
																											icon : 6
																										})
																					}
																					$(".layui-laypage-btn")[0]
																							.click();
																				})
																layer.close(index);
															})
	
										}
										break;
									}
									;
								});
	
				//监听行工具事件
				table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
					var data = obj.data //获得当前行数据
					, layEvent = obj.event; //获得 lay-event 对应的值
					if (layEvent === 'detail') {
						//修改状态
						if (data.equState == 2) {
							$.get('/EquipmentManage/equ/addOrUpdateEqu', {
								equId : data.equId,
								equState : 1
							}, function(ajaxData) {
								if (ajaxData.state == 0) {
									layer.msg('设备确认借出', {
										icon : 4
									});
									$(".layui-laypage-btn")[0].click();
								}
							})
						} else {
							layer.msg("设备暂未预约，不可借出", {
								icon : 5
							})
						}
					} else if (layEvent === 'edit') {
						if (data.equState == 1) {
							$.get('/EquipmentManage/equ/addOrUpdateEqu', {
								equId : data.equId,
								equState : 0,
								userName : ''
							}, function(ajaxData) {
								if (ajaxData.state == 0) {
									layer.msg('设备确认已归还', {
										icon : 6
									});
									$(".layui-laypage-btn")[0].click();
								}
							})
						} else {
							layer.msg("设备暂为借出，无需归还", {
								icon : 5
							})
						}
	
					} else if (layEvent === 'del') {
						if (data.equState == 2) {
							$.get('/EquipmentManage/equ/addOrUpdateEqu', {
								userName : "",
								equId : data.equId,
								equState : 0
							}, function(ajaxData) {
								if (ajaxData.state == 0) {
									layer.msg('设备取消预约', {
										icon : 6
									});
									$(".layui-laypage-btn")[0].click();
								}
							})
						} else {
							layer.msg("你还为预约该设备，不需要取消", {
								icon : 5
							})
						}
					}
				});
				//监听搜索框事件
			form.on('select(state)', function(data) {
				table.reload('equInfo', {
					where : {
						equState : data.value
					}
				})
			});
			//监听输入框事件
			$('.equCode').change(function(){
				$.get('/EquipmentManage/equ/getAllEqusByCondition',
						{equCode:$('.equCode').val()},function(ajaxDate){
					if(!ajaxDate.data.length){
						layer.confirm('没有该条码的设备，是否需要输入该设备',{
							icon : 3,
							title : '提示'
						},
						function(index) {
							$('.addEquipment').click();
						})
						
					}else{
						table.reload('equInfo',{
							where : {
								equCode : $('.equCode').val()
							}
						})
					}
				})

			})
		$('input[name="equCode"]').focus(function(){
			$(this).attr('placeholder','');
			$(this).val('');
		});
		$('input[name="equCode"]').focusout(function(){
				$(this).attr('placeholder','扫描器数或手动数据录入区')
			});
		});
 	initScannerModule();
function initScannerModule(){
     var code = "";
     var lastTime,nextTime;
     var lastCode,nextCode;
     document.onkeypress = function(e) {
         nextCode = e.which;
         nextTime = new Date().getTime();

         if(lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
             code += String.fromCharCode(lastCode);
         } else if(lastCode != null && lastTime != null && nextTime - lastTime > 100){
             code = "";
         }
         lastCode = nextCode;
         lastTime = nextTime;
         console.log(code);
     }
     this.onkeypress = function(e){
         if(e.which == 13){
             code=$('input[name="equCode"]').val();
             $('input[name="equCode"]').val(code);
         }
     }
 }