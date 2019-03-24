$(function(){
	var userInfoUrl = ipPort + "/equipment/user",
		equipmentInfoUrl = ipPort + "/equipment/detail",
		userInfoData,equipmentXData,equipmentYData;
	var active = {
			"userInfo": function( jsonData ){
				console.log(active.userInfo);
				console.log(jsonData);
				userInfoData = jsonData.data;
			},
			"equipmentInfo": function( jsonData ){
				console.log(active.userInfo);
				console.log(jsonData);
				equipmentXData = jsonData.data.x;
				equipmentYData = jsonData.data.y;
			}
	}
	ajax( 'get', userInfoUrl, {}, active.userInfo, false );
	ajax( 'get', equipmentInfoUrl, {}, active.equipmentInfo, false );
	console.log('------------数据初始化完成-----------');
	console.log(userInfoData);
	console.log(equipmentXData);
	console.log(equipmentYData);
	
	var myChart = echarts.init( $('#userInfo') );	
	var option = {
	    title: {
	        text: '设 备 使 用 状 态 情 况',
	        //subtext: '使用',
	        left: 'center',
	        textStyle:{
	            fontSize:36
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        // orient: 'vertical',
	        // top: 'middle',
	        bottom: 10,
	        left: 'center',
	        data: ['预约中', '使用中', '空置中']
	    },
	    series : [
	        {
	            type: 'pie',
	            radius : '65%',
	            center: ['50%', '50%'],
	            selectedMode: 'single',
	            data:[
	                {value:1548, name: '预约中'},
	                {value:535, name: '使用中'},
	                {value:510, name: '空置中'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	if( userInfoData ){
		myChart.setOption(option);
	}	
	
	
	var myChart1 = echarts.init( $('#equipmentInfo') );	
	var option1 = {
	     title: {
	         text: '设 备 分 类 数 量 统 计',
	         //subtext: '使用',
	         left: 'center',
	         textStyle:{
	             fontSize:36
	         }
	     },
	     color: ['#3398DB'],
	     tooltip : {
	         trigger: 'axis',
	         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	         }
	     },
	     grid: {
	         left: '3%',
	         right: '4%',
	         bottom: '3%',
	         containLabel: true
	     },
	     xAxis : [
	         {
	             type : 'category',
	             //data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	             data : equipmentXData,
	             axisTick: {
	                 alignWithLabel: true
	             }
	         }
	     ],
	     yAxis : [
	         {
	             type : 'value'
	         }
	     ],
	     series : [
	         {
	             name:'直接访问',
	             type:'bar',
	             barWidth: '60%',
	             //data:[10, 52, 200, 334, 390, 330, 220]
	         	 data:equipmentYData
	         }
	     ]
	};
	if( equipmentXData && equipmentYData ){
		myChart1.setOption( option1 );
	}	
})