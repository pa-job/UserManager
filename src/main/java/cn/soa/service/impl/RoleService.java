
	/**  
     * @Title: userService.java
 	 * @Package cn.userCenter.service.impl
 	 * @Description: )
 	 * @author zhugang
 	 * @date 2019年1月12日
 	 * @version V1.0  
 	 */

        
package cn.soa.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.soa.dao.UserRoleMapper;
import cn.soa.entity.AuthInfo;
import cn.soa.entity.UserOrganization;
import cn.soa.entity.UserRole;
import cn.soa.entity.UserRoleRelation;
import cn.soa.service.inter.RoleServiceInter;


	/**
 	 * @ClassName: userService
 	 * @Description: 用户信息服务  - 业务层
 	 * @author zhugang
 	 * @date 2019年1月12日
 	 */
@Service
public class RoleService implements RoleServiceInter{
	private static Logger logger = LoggerFactory.getLogger( RoleService.class );	
	
	@Autowired
	private UserRoleMapper userRoleMapper;

	
	 /**   
	  * @Title: getUserRoleByUserid   
	  * @Description: 根据用户id查询用户具有的角色           
	  * @return: UserRole        
	  */  
	@Override
	public List<UserRole> getUserRoleByNum( String usernum ) {
		List<UserRole> userRoles = userRoleMapper.findUserRoleByNum(usernum);
		return userRoles;
	}	
	
	

	@Override
	public List<UserRole> queryAllroles(Integer page, Integer pageSize) {
		if(page==null || pageSize==null) {
			page=0;
			pageSize=0;
		}
		return userRoleMapper.queryAllroles((page-1)*pageSize,page*pageSize);
	}


	@Override
	public int countRoles() {
		// TODO A.uto-generated method stub
		return userRoleMapper.countRoles();
	}


	@Override
	public int saveUserRole(UserRole userRole) {
		
		return userRoleMapper.saveUserRole(userRole);
	}


	@Override
	public int modifyUserRoleById(UserRole userRole) {
		// TODO Auto-generated method stub
		return userRoleMapper.modifyUserRoleById(userRole);
	}


	@Override
	public int deleteRolesInIds(String[] ids) {
		// TODO Auto-generated method stub
		return userRoleMapper.deleteRolesInIds(ids);
	}


	@Override
	public List<Map<String ,Object>> queryUsersByRold(String ROLID) {
		List<UserOrganization> orgs=userRoleMapper.queryAllorgnInfo();
		logger.debug("---S-----queryUsersByRold----------:" + orgs );
		List<UserOrganization> orgsByid=userRoleMapper.queryUsersByRold(ROLID);
		System.out.println(orgsByid.toString());
		List<Map<String ,Object>> lists=new ArrayList<Map<String ,Object>>();
		for( UserOrganization org:orgs) {
			Map<String,Object> map=new HashMap<>();
			map.put("name",org.getName());
			map.put("orgid",org.getOrgid());
			map.put("is_parent",org.getIs_parent());
			map.put("usernum",org.getUsernum());
			map.put("parent_id",org.getParent_id());
			if(org.getUsernum().equals("0")) {
				map.put("open", true);
			}
			if( !orgsByid.isEmpty() ) {
				for(int i=0;i<orgsByid.size();i++) {
					if( orgsByid.get(i) != null && org != null ) {
						if(org.getName().equals(orgsByid.get(i).getName())) {
							map.put("checked", true);
						};	
					}
										
				}
			}
			
			lists.add(map);
		}		
		return lists;
	}



	@Override
	public int deleteUserUserAndRolebyId(String rolid) {
		// TODO Auto-generated method stub
		return  userRoleMapper.deleteUserUserAndRolebyId(rolid);
	}


	@Override
	 public int saveUserUserRoleInBatch(List<UserRoleRelation> lists) {
		return userRoleMapper.saveUserUserRoleInBatch(lists);
		
	}


	
}
