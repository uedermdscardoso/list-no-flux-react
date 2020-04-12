package dev.uedercardoso.listflux.domain.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="fx_item")
@Getter @Setter
public class Item implements Serializable {
	
	private static final long serialVersionUID = -5177862316548308444L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private String description;
	
	@NotNull
	@Column(name="is_checked", columnDefinition="bit(1) default 0")
	private Boolean isChecked;
	
	public Item() {
		
	}
	
}
