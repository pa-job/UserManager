package cn.soa.service;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import cn.soa.EquipmentManageApplication;
import cn.soa.dao.EquipmentManagerMapper;
import cn.soa.entity.UserInfo;
import cn.soa.entity.UserOrganization;
import cn.soa.entity.UserRegister;
import cn.soa.service.inter.EquipmentManagerInter;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { EquipmentManageApplication.class })
@WebAppConfiguration
public class EquipmentTest {
	@Autowired
	public EquipmentManagerInter equipmentManagerInter;
	
	//增加用户注册信息
	@Test
	public void findLastEquipType() {
		List<Map<String, String>> findLastEquipNumS = equipmentManagerInter.findLastEquipNumS();
		System.out.println(findLastEquipNumS);
	}
	
	//@Test
	public void findEquipUse() {
		List<Map<String,String>> findLastEquipType = equipmentManagerInter.findEquipUseS();
		System.out.println(findLastEquipType);
	}
}
