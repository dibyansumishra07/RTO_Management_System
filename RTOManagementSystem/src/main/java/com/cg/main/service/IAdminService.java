package com.cg.main.service;

/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [19:44]
 */


import java.util.List;

/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date:
*/
import com.cg.main.model.Admin;
/*=========================================================================
INTERFACE
=========================================================================
*/

public interface IAdminService {
	/*
	 * @Params Admin admin
	 * 
	 * @Name addAdmin
	 * 
	 * @return Admin
	 */
	public Admin addAdmin(Admin admin);
	/*
	 * @Params Integer id
	 * 
	 * @Name getAdmin
	 * 
	 * @return Admin
	 */
	public Admin getAdmin(Integer id);
	
	/*
	 * @Params Admin admin
	 * 
	 * @Name getAdminByName
	 * 
	 * @return Admin
	 */
	
	public List<Admin> getAllAdmin();
	
	


}
