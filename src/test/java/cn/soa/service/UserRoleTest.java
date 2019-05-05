package cn.soa.service;

import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import cn.soa.UserManagerApplication;
import cn.soa.dao.UserRoleMapper;
import cn.soa.entity.AuthInfo;
import cn.soa.service.inter.RoleServiceInter;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = UserManagerApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UserRoleTest {

	@Autowired
	public RoleServiceInter roleServiceInter;
	

}
