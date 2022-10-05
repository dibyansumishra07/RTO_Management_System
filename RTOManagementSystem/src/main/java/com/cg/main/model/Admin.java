package com.cg.main.model;
/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [19:44]
 */

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


import com.sun.istack.NotNull;
//Creating an entity class 
@Entity
//Creating a table by using user specified name 
@Table(name = "Rto_Admin_db")

public class Admin {
	/*
	 * =========================================================================
	 * VARIABLES
	 * =========================================================================
	 */
	@Id
	@GeneratedValue
	//@Column(name="id")
	private Integer id;
	@NotNull
	//@Column(name="adminName")
	private String adminName;
	@NotNull
	//@Column(name="email")
	private String email;
	@NotNull
	//@Column(name="password")
	private String password;

	/*
	 * =========================================================================
	 * CONSTRUCTERS
	 * =========================================================================
	 */
	public Admin() {
		
	}
	public Admin(Integer id, String adminName,String email ,String password) {
		super();
		this.id = id;
		this.adminName = adminName;
		this.email=email;
		this.password = password;
	}
	
	
	/*
	 * =========================================================================
	 * GETTERS AND SETTERS
	 * =========================================================================
	 */
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAdminName() {
		return adminName;
	}
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	/*
	 * =========================================================================
	 * toString Method
	 * =========================================================================
	 */
	@Override
	public String toString() {
		return "{\nid:" + id + ", \nadminName:" + adminName + ", \npassword:" + password + ",\n email" + email +"\n}";
	}
	
	
	
}
