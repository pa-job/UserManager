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
				elem : '#equInfo',
				url : '/EquipmentManage/equ/getAllEqusByCondition',
				cellMinWidth : 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
				,
				loading : true,
				page : true,
				limit:10,
				limits:[5,10,15,20],
				cols : [ [ {
					type : 'checkbox'
				}, {
					type : 'numbers'
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

			//监听行工具事件
			table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
				var data = obj.data //获得当前行数据
				, layEvent = obj.event; //获得 lay-event 对应的值
				if (layEvent === 'detail') {
					//修改状态
					if (data.equState == 0) {
						$.get('/EquipmentManage/equ/addOrUpdateEqu', {
							userName:$.cookie('name').replace(/\"/g,""),
							equId : data.equId,
							equState : 2
						}, function(ajaxData) {
							if (ajaxData.state == 0) {
								layer.msg('设备预约成功', {
									icon : 4
								});
								$(".layui-laypage-btn")[0].click();
							}
						})
					} else {
						layer.msg("设备已被使用，不可预约", {
							icon : 5
						})
					}
				} else if (layEvent === 'edit') {
					if (data.equState == 2) {
						$.get('/EquipmentManage/equ/addOrUpdateEqu', {
							userName:"",
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
			//监听下拉选事件
			form.on('select(state)', function(data) {
				table.reload('equInfo', {
					where : {
						equState : data.value
					}
				})
			});
			//监听输入框事件
			$('input[name="equName"]').change(function(){
				table.reload('equInfo', {
					where : {
						equName : $(this).val()
					}
				})
			})
		});