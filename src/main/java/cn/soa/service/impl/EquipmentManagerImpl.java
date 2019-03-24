package cn.soa.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.soa.dao.EquipmentManagerMapper;
import cn.soa.entity.EquipmentInfo;
import cn.soa.entity.EquipmentType;
import cn.soa.entity.UserInfo;
import cn.soa.service.inter.EquipmentManagerInter;
@Service
public class EquipmentManagerImpl  implements EquipmentManagerInter{
	@Autowired
	private  EquipmentManagerMapper EquipmentManagerDao;
	@Override
	public List<EquipmentType> queryAllTypeOfEqu() {
		// TODO Auto-generated method stub
		return EquipmentManagerDao.queryAllTypeOfEqu();
	}

	@Override
	public List<EquipmentInfo> queryAllEqusByCondition(EquipmentInfo info, Integer page, Integer pageSize) {
		
		return EquipmentManagerDao.queryAllEqusByCondition(info,page,pageSize);
	}

	@Override
	public Integer QueryEquCount(EquipmentInfo info) {
		// TODO Auto-generated method stub
		return EquipmentManagerDao.QueryEquCount(info);
	}

	@Override
	public Integer updateEquBaseInfo(EquipmentInfo info) {
		// TODO Auto-generated method stub
		return EquipmentManagerDao.updateEquBaseInfo(info);
	}

	@Override
	public Integer insertEquBaseInfo(EquipmentInfo info) {
		// TODO Auto-generated method stub
		return EquipmentManagerDao.insertEquBaseInfo(info);
	}

	@Override
	public Integer deleteEquBaseInfo(List<Integer> ids) {
		// TODO Auto-generated method stub
		return EquipmentManagerDao.deleteEquBaseInfo(ids);
	}
	
	/**   
	 * @Title: findLastEquipNumS   
	 * @Description: 查询设备分类数量情况   
	 * @return: List<Map<String,String>>        
	 */  
	@Override
	public List<Map<String,String>> findLastEquipNumS(){
		try {
			List<Map<String, String>> equipNums = EquipmentManagerDao.findLastEquipNum();
			List<Map<String, String>> newEquipNums = new ArrayList<Map<String, String>>();
			System.out.println(equipNums);
			//查询所有最后级分类
			if( equipNums != null) {
				List<String> equipTypes = EquipmentManagerDao.findLastEquipType();
				for( int j = 0; j < equipTypes.size(); j++ ) {
					String s = equipTypes.get(j);
					System.out.println(s);
					for( int i = 0; i < equipNums.size(); i++ ) {						
						if( equipNums.get(i).get("NAME").equals(s) ) {
							break;
						}
						if( i == (equipNums.size() - 1) ) {
							HashMap<String, String> tempMap = new HashMap<String,String>();
							tempMap.put("NAME", s);
							tempMap.put("NUM", 0+"");
							newEquipNums.add(tempMap);
						}
					}					
				}
			}	
			System.out.println("newEquipNums:"+newEquipNums);
			equipNums.addAll(newEquipNums);
			System.out.println(equipNums);
			return equipNums;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**   
	 * @Title: findLastEquipNumS   
	 * @Description: 查询统计设备使用情况
	 * @return: List<Map<String,String>>        
	 */ 
	@Override
	public List<Map<String,String>> findEquipUseS(){
		try {
			List<Map<String, String>> equipUses = EquipmentManagerDao.findEquipUse();
			List<Map<String, String>> newEquipUses = new ArrayList<Map<String, String>>();
			List<String> useInfos = new ArrayList<String>();
			useInfos.add("未使用");
			useInfos.add("预约中");
			useInfos.add("使用中");
			if( equipUses != null ) {
				for( String s : useInfos ) {
					for( int i = 0; i < equipUses.size(); i++ ) {
						if( equipUses.get(i).get("name").equals(s) ) {
							break;
						}
						if( i == (equipUses.size() - 1) ) {
							HashMap<String, String> tempMap = new HashMap<String,String>();
							tempMap.put("name", s);
							tempMap.put("value", "0");
							newEquipUses.add(tempMap);
						}
					}
				}
			}			
			equipUses.addAll(newEquipUses);
			return equipUses;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
