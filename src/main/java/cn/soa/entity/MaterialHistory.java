package cn.soa.entity;


import java.io.Serializable;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@SuppressWarnings( "serial" )
@AllArgsConstructor
@NoArgsConstructor 
@Data
@Accessors( chain=true )
@Entity
public class MaterialHistory  implements Serializable {
	private String mhid;
	private String mid;
	private String time;
	private String tflaginout;
	private String aera;
	private String aflaginout;
	private String busrfid;
	private String person1;
	private String person2;
	private String note;
	private String remark1;
	private String remark2;
}
