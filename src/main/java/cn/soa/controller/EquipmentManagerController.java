package cn.soa.controller;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
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
	public UserTableJson<List<EquipmentInfo>> queryAllEqusByCondition( EquipmentInfo info,@RequestParam(value="page",required=false) Integer page,@RequestParam(value="limit",required=false) Integer pageSize){
		if(pageSize==null &&page==null) {
			pageSize=-1;
			page=-1;
		};
		List<EquipmentInfo> lists =EquipmentManagerService.queryAllEqusByCondition(info, (page-1)*pageSize, pageSize);
		
		Integer count=EquipmentManagerService.QueryEquCount(info);
	
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
}
