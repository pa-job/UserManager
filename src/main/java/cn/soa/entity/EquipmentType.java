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
public class EquipmentType  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer typeId;
	private String typeName;
	private Integer parentId;
	private String remark1;

}
