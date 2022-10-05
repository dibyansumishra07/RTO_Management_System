
package com.cg.main.controller;

/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [18:42]
 */

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
/*
 
 * @Start Date:19MAY2020 
 * @Update Date:
 */
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.main.model.Admin;
import com.cg.main.model.User;
import com.cg.main.service.IAdminService;
import com.cg.main.service.IUserService;

@CrossOrigin(origins = {"http://localhost:4200"}, allowedHeaders = "*") 
@RestController
@RequestMapping("/rto/admin")
public class AdminController {
	
	@Autowired
	private IAdminService aService;
	@Autowired
	private IUserService uService;
	
	private static final Logger logger = LoggerFactory.getLogger(User.class);
	/*
	  * @Params: RequestBody Admin admin
	  * @Name: addAdmin
	  * @Return: Admin
	  * @PassByUrl: Null
	  * @PassJsonVariables:  {adminName, Password}
	  * @Desc: Adding new Admin
	  * @Path: localhost:8082/rto/admin/addAdmin
	  */
	
	@CrossOrigin("*")
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		if(admin.getAdminName()==null) {
			admin.setAdminName("");
		}
		if(admin.getPassword()==null) {
			admin.setPassword("");
		}
		
		Admin newAdmin=aService.addAdmin(admin);
		if(newAdmin!=null) {
			String output= String.format("Hey, %s\n\n Succssfully added your details as Admin, Access all the users credentials carefully. Your Details are provided below, Please verify it, If any changes required\nContact to your corressponding Admin\nDo not share these credentials with anyone.\n\n"
					+ "\nAdmin ID: %d\nAdmin Name: %s\nAdmin Password: %s\n\n ***Do not reply to this mail, this is an auto generated mail***",newAdmin.getAdminName(),newAdmin.getId(),newAdmin.getAdminName(),newAdmin.getPassword() );
			Boolean test=uService.sendMail(admin.getEmail(), "RTO - Success - New Admin", output);
			if(test) {
				logger.info("Mail sent successfully from Add Admin Method");
			}
			else {
				logger.warn("Mail can not send from  Add Admin Method");
			}
			return newAdmin;
		}
		else {
			return null;
		}
		
	}
	
	/*
	  * @Params: PathVariable Integer id
	  * @Name: getAdmin
	  * @Return: Admin
	  * @PassByUrl: /{id}
	  * @PassJsonVariables: Null
	  * @Desc: Get Particular admin from Database by using ID
	  * @Path: localhost:8082/rto/admin/getAdmin/81
	  */
	
	@GetMapping("/getAdmin/{id}")
	public Admin getAdmin(@PathVariable Integer id) {
		Admin showAdmin=aService.getAdmin(id);
		return showAdmin;
	}
	
	/*
	  * @Params: PathVariable Integer id
	  * @Name: getUserById
	  * @Return: User
	  * @PassByUrl: /{id}
	  * @PassJsonVariables: Null
	  * @Desc: Get Particular user from Database by using ID
	  * @Path: localhost:8082/rto/admin/getUserById/81
	  */

	 @GetMapping("/getUserById/{id}")
	 public User getUserById(@PathVariable Integer id) { 
		 User user=uService.getLic(id);
		 return user;
	  }
	
	 /*
	  * @Params: Null
	  * @Name: getAllLic
	  * @Return: List<User>
	  * @PassByUrl: Null
	  * @PassJsonVariables: {Null}
	  * @Desc: get all license list
	  * @Path: localhost:8082/rto/admin/getAllLic
	  */

	 @GetMapping("/getAllLic")
	 public List<User> getAllLic() { 
		 List<User> AllUser=uService.getAllLic();
		 return AllUser;
	  }

	 /*
	  * @Params: Admin admin
	  * @Name: adminLogin
	  * @Return: List<User>
	  * @PassByUrl: Null
	  * @PassJsonVariables: {adminName, password}
	  * @Desc: Admin can log in by giving user name and password
	  * @Path: localhost:8082/rto/admin/adminLogin
	  */
	 
	 @PostMapping("/adminLogin")
	 public Admin adminLogin(@RequestBody Admin admin) { 
		 	String email=admin.getEmail();
		 	String password=admin.getPassword();
		 
			List<Admin> newAdmins= aService.getAllAdmin();
			
			for(Admin newAdmin:newAdmins) {
				
				if(  newAdmin.getEmail().equals(email)  && newAdmin.getPassword().contentEquals(password)) {
					return admin;
				}
				
			}
			return null;
			
		}
	 
	 /*
	  * @Params: null
	  * @Name: getAllAdmin
	  * @Return:  List <Admin>
	  * @PassByUrl: Null
	  * @PassJsonVariables: {Null}
	  * @Desc: get all admins present in database
	  * @Path: localhost:8082/rto/admin/getAllAdmin
	  */
	 @GetMapping("/getAllAdmin")
	 public List<Admin> getAllAdmin() {
		 List <Admin> admins=aService.getAllAdmin();
		 return admins;
	 }
	 /*
	  * @Params: PathVariable Integer id
	  * @Name: setStatus
	  * @Return: User
	  * @PassByUrl: /{appId}
	  * @PassJsonVariables: Null
	  * @Desc: Admin can approve, pending and reject the application 
	  * @Path: localhost:8082/rto/admin/setStatus/81
	  */
	
	 enum Status{
			approve,
			pending,
			reject
		}
	 
	@PutMapping("/setStatus")
	public User setStatus(@RequestBody User oldUser) {
		 User newUser;
		 User user=uService.getLic(oldUser.getAppId());
		 String output="";
		 System.out.println(oldUser.getLicStatus());
		if(oldUser.getLicStatus().equals(Status.approve.toString())) {
			if(user.getAdhar()!=null && user.getBloodGroupCertificate()!=null || user.getCertificate()!=null && user.getTestDriveDate()!=null) {
				user.setLicStatus(Status.approve.toString());
				logger.info("Setting status of user to Approve");
				 output= String.format("Hey, %s\n Your Licence is Approved by Admin Succssfully,\nYour Application ID is: %d\nYour LL Number is: %s\nYour TestDrive Date is: %s\nNow You can apply Driving Licence!\n\n\t **Do not try to reply, this is autogenerated mail**",user.getUserName(),user.getAppId(),user.getLlNo(),user.getTestDriveDate());
			}
			else {
				//if(user.getAdhar()!=null || user.getBloodGroupCertificate()!=null || user.getCertificate()!=null && user.getTestDriveDate()==null) {
				user.setLicStatus(Status.pending.toString());
				output= String.format("Hey, %s\n Unfortunately Your Licence is in Pending Mode by Admin Due to\nsome severe error in files or not submitting the required files,\n please upload or reupload those mandatory files again! ,\n\nYour Application ID is: %d\nYour LL Number is: %s\nYour TestDrive Date is: %s\nPlease submit your files and admin will approve your licence!\n\n\t **Do not try to reply, this is autogenerated mail**",user.getUserName(),user.getAppId(),user.getLlNo(),user.getTestDriveDate());
				uService.sendMail(user.getEmail(), "RTO - Succssfully Appeared Drive Test", output);
				return null;
			}
			
		 }
		  if(oldUser.getLicStatus().equals(Status.reject.toString()))  {
			 user.setLicStatus(Status.reject.toString());
			 output= String.format("Hey, %s\n\n Sorry! Unfortunately Your Licence is rejected by Admin Due to\nsome severe error in files or not submitting all the required files,\n please re-apply the Licence again! ,\n\nYour Application ID was: %d\nYour LL Number was: %s\n\n!!!Deleted by Admin, Please reapply it!!!\n\n\t **Do not try to reply, this is autogenerated mail**",user.getUserName(),user.getAppId(),user.getLlNo());
			uService.sendMail(oldUser.getEmail(), "RTO - ADMIN- Licence Status", output);
				
			 uService.delLic(user.getAppId());
			 
			 return user;
		 }
		  if(oldUser.getLicStatus().equals(Status.pending.toString()))  {  
			 user.setLicStatus(Status.pending.toString());
			 output= String.format("Hey, %s\n Unfortunately Your Licence is in Pending Mode by Admin Due to\nsome severe error in files or not submitting the required files,\n please upload or reupload those mandatory files again! ,\n\nYour Application ID is: %d\nYour LL Number is: %s\nYour TestDrive Date is: %s\nPlease submit your files and admin will approve your licence!\n\n\t **Do not try to reply, this is autogenerated mail**",user.getUserName(),user.getAppId(),user.getLlNo(),user.getTestDriveDate());
		 }
		  
		newUser=uService.updateLic(user);
		Boolean test=uService.sendMail(newUser.getEmail(), "RTO - ADMIN- Licence Status", output);
		if(test) {
			logger.info("Mail sent successfully from set Licence Method");
		}
		else {
			logger.warn("Mail can not send from  set Licence Method");
		}
		return newUser;
	}
	
	@PutMapping("/forgotPassword")
	public Admin forgotPassword(@RequestBody Admin admin) {
		List<Admin> newAdmins= aService.getAllAdmin();
		
		for(Admin newAdmin:newAdmins) {
			
			if(  newAdmin.getAdminName().equals(admin.getAdminName())  && newAdmin.getEmail().equals(admin.getEmail())) {
				String output= String.format("Hey, %s\n\n We notified for your Forgot Password request!\n Your Details are provided below, Do not share this credential with anyone.\n\n"
						+ "\nAdmin ID: %d\nAdmin Name: %s\nAdmin Password: %s\n\n ***Do not reply to this mail, this is an auto generated mail***",newAdmin.getAdminName(),newAdmin.getId(),newAdmin.getAdminName(),newAdmin.getPassword() );
				Boolean test=uService.sendMail(newAdmin.getEmail(), "RTO - Request- Forgot Password", output);
				if(test) {
					logger.info("Mail sent successfully from FogotPass Method");
				}
				else {
					logger.warn("Mail can not send from  FogotPass Method");
				}
				return newAdmin;
			}
		}
		return null;
	}
	 
}
