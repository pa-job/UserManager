package cn.soa.entity;


import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

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
public class Material  implements Serializable {
	@Id
    @GenericGenerator(name="idGenerator", strategy="uuid") //这个是hibernate的注解/生成32位UUID
    @GeneratedValue(generator="idGenerator")
	
	private String mid;
	
	private String rfid;
	private String name;
	private String number;
	private String createtime;
	private String currtime;
	private String curraera;
	private String authaera;
	private String shelves;
	private String requirebusrfid;
	private String note;	
	private String flag;	
	private String remark1;
	private String remark2;
	@OneToMany(mappedBy = "material")
	private List<MaterialHistory> mh;
}
