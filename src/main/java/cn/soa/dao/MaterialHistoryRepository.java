package cn.soa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import cn.soa.entity.Material;
import cn.soa.entity.MaterialHistory;

@RepositoryRestResource(path="materialhistorys")
public interface MaterialHistoryRepository extends JpaRepository<MaterialHistory, String> {
	
//	@RestResource(path="pname",rel="pname")
//	Material findByPname(@Param("pname") String pname );
}
