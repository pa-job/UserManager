package cn.soa.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import cn.soa.entity.EquipmentInfo;
import cn.soa.entity.EquipmentType;
@Mapper
public interface EquipmentManagerMapper {
	 /*
	  * 查询所有设备分类
	  */
	public List<EquipmentType> queryAllTypeOfEqu();
	/*
	 * 按照条件查询设备基本信息，含分页功能
	 */
	public List<EquipmentInfo> queryAllEqusByCondition(@Param("info") EquipmentInfo info,@Param("page") Integer page,@Param("pageSize") Integer pageSize );
	/*
	 * 根据条件统计设备数量
	 */
	public Integer  QueryEquCount(@Param("info") EquipmentInfo info);
	/*
	 * 修改设备基本信息，包含全部信息，或者某一个信息，例如修改设备状态
	 */
	public Integer updateEquBaseInfo(@Param("info")EquipmentInfo info);
	/*
	 * 增加设备
	 */
	public Integer  insertEquBaseInfo(@Param("info")EquipmentInfo info);
	/*
	 * 删除设备信息
	 */
	public  Integer deleteEquBaseInfo(@Param("ids")List<Integer> ids);

	/**   
	 * @Title: findLastEquipNum   
	 * @Description:  查询设备分类数量情况 
	 * @return: List<Map<String,String>>        
	 */  
	public List<Map<String,String>> findLastEquipNum();
	
	/**   
	 * @Title: findLastEquipNum   
	 * @Description:  查询统计设备使用情况
	 * @return: List<Map<String,String>>        
	 */  
	public List<Map<String,String>> findEquipUse();
	
	/**   
	 * @Title: findLastEquipType   
	 * @Description: findLastEquipType  
	 * @return: List<String>        
	 */  
	public List<String> findLastEquipType();
}
