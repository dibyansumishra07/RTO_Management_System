package com.cg.main.service;

/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [19:44]
 */

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.main.dao.IAdminDao;
import com.cg.main.model.Admin;





@Service
@Transactional
public class AdminService implements IAdminService{
 
 @Autowired
 IAdminDao dao;
 
 	/*
	 * @Params Admin admin
	 * 
	 * @Name addAdmin
	 * 
	 * @return Admin
	 * 
	 * @Desc: TODO
	 */
 	@Override
	 public Admin addAdmin(Admin admin) {
		Admin ad=dao.save(admin);
		return ad;
	 }
	 
	 /*
		 * @Params Integer id
		 * 
		 * @Name getAdmin
		 * 
		 * @return Admin
		 * 
		 * @Desc: TODO
		 */
	 @Override
	 public Admin getAdmin(Integer id) {
		 Admin admin=dao.findById(id).get();
		 return admin;
	 }
	 

		/*
		 * @Params Null
		 * 
		 * @Name getAllAdmin
		 * 
		 * @return List<Admin>
		 * 
		 * @Desc: TODO
		 */
		
		
		  @Override
		  public List<Admin> getAllAdmin(){
			  List<Admin> list = new ArrayList<>();
			  Iterable<Admin> iterable = dao.findAll(); 
			  Iterator<Admin> iterator = iterable.iterator();
		  
			  while (iterator.hasNext()) {
				  Admin admin = iterator.next(); 
				  list.add(admin); 
				  }
			  return list;
		  }
		
	 
	 
 
	
}