package cn.soa.entity;


import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
public class MaterialHistory  implements Serializable {
	@Id
    @GenericGenerator(name="idGenerator", strategy="uuid") //这个是hibernate的注解/生成32位UUID
    @GeneratedValue(generator="idGenerator")
	private String mhid;	
	private String mid;
	private String time;
	private String tflaginout;
	private String aera;
	private String aflaginout;
	private String busrfid;
	private String number;
	private String person1;
	private String person2;
	private String note;
	private String remark1;
	private String remark2;
	@ManyToOne
	private Material material;
}
