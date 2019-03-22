package cn.soa.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@SuppressWarnings( "serial" )
@AllArgsConstructor
@NoArgsConstructor
@Data
@Accessors( chain=true )
public class EquipmentUseInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer infoId;
	private String name;
	private String usernum; 
	private Integer equId;
	private  String equInTime; 
	private  String equOutTime; 
	private  String equOrderTime;
	private String remark1;
	
}