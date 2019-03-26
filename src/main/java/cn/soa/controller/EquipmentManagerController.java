package cn.soa.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.soa.entity.EquipmentInfo;
import cn.soa.entity.EquipmentType;
import cn.soa.entity.UserRole;
import cn.soa.entity.headResult.ResultJson;
import cn.soa.entity.headResult.UserTableJson;
import cn.soa.service.inter.EquipmentManagerInter;

@RestController
@RequestMapping("/equ")
public class EquipmentManagerController {
	@Autowired
	private EquipmentManagerInter  EquipmentManagerService;
	@RequestMapping("/getEquTypes")
	public ResultJson<List<EquipmentType>> queryAllTypeOfEqu(){
		List<EquipmentType> lists=EquipmentManagerService.queryAllTypeOfEqu();
		return new ResultJson(lists);
		
	};
	@RequestMapping("/getAllEqusByCondition")
	public UserTableJson<List<EquipmentInfo>> queryAllEqusByCondition( EquipmentInfo info,@RequestParam(value="list[]",required=false) List<Integer> list,@RequestParam(value="page",required=false) Integer page,@RequestParam(value="limit",required=false) Integer pageSize){
		if(pageSize==null &&page==null) {
			pageSize=-1;
			page=-1;
		};
		System.out.println("lxf---------------------------"+list);
		if(list==null||list.size()==0) {
			list=new ArrayList<>();
			List<EquipmentType> lists=EquipmentManagerService.queryAllTypeOfEqu();
			for(EquipmentType e:lists) {
				list.add(e.getTypeId());
			}
		};
		System.out.println("list"+list);
		List<EquipmentInfo> lists =EquipmentManagerService.queryAllEqusByCondition(info,list, (page-1)*pageSize, pageSize);
		
		Integer count=EquipmentManagerService.QueryEquCount(info,list);
	
		if(count==null) {
			count=0;
		};
		return new  UserTableJson("",0,"",lists,count,true);
	}
	@RequestMapping("/addOrUpdateEqu")
	public ResultJson<Integer> addOrUpdateEqu (EquipmentInfo info){
		int count=-1;
		if(info.getEquId()==null) {
			 count=EquipmentManagerService.insertEquBaseInfo(info);
		}else {
			 count=EquipmentManagerService.updateEquBaseInfo(info);
		}
		return new  ResultJson(count);
		
	}
	@RequestMapping("/deleteEquBaseInfo")
	public ResultJson<Integer> deleteEquBaseInfo (@RequestParam("list[]") List<Integer>  list){
		System.out.println("list"+list);
		int count=EquipmentManagerService.deleteEquBaseInfo(list);
		return new  ResultJson(count);
	}
	
	/**   
	 * @Title: findLastEquipNumC   
	 * @Description: 查询设备分类数量情况     
	 * @return: ResultJson<List<Map<String,String>>>        
	 */ 
	@GetMapping("/detail")
	public ResultJson<List<Map<String,String>>> findLastEquipNumC(){
		List<Map<String, String>> equipNums = EquipmentManagerService.findLastEquipNumS();
		System.out.println(equipNums);
		if( equipNums == null ) {
			return new ResultJson<List<Map<String,String>>>( 1, "查询数据为空", equipNums);
		}else {
			return new ResultJson<List<Map<String,String>>>( 0, "查询成功", equipNums);
		}	
	}
	
	/**   
	 * @Title: findLastEquipNumC   
	 * @Description: 查询设备分类数量情况     
	 * @return: ResultJson<List<Map<String,String>>>        
	 */  
	@GetMapping("/user")
	public ResultJson<List<Map<String,String>>> findEquipUseC(){
		List<Map<String, String>> equipUsers = EquipmentManagerService.findEquipUseS();
		System.out.println(equipUsers);
		if( equipUsers == null ) {
			return new ResultJson<List<Map<String,String>>>( 1, "查询失败", equipUsers);
		}else {
			return new ResultJson<List<Map<String,String>>>( 0, "查询成功", equipUsers);
		}	
	}
}
