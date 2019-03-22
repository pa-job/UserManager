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
public class EquipmentInfo  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer equId;
	private Integer typeId;
	private String equName;
	private String   equInTime;
	private String   equCode;
	private Integer equState;  
	private String remark1;
	@Override
	public String toString() {
		return "EquipmentInfo [equId=" + equId + ", typeId=" + typeId + ", equName=" + equName + ", equInTime="
				+ equInTime + ", equCode=" + equCode + ", equState=" + equState + ", remark1=" + remark1 + "]";
	}
}
