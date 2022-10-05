package com.cg.main.service;

/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [19:44]
 */

import java.text.ParseException;
import java.util.List;

/*=========================================================================
INTERFACE
=========================================================================
*/

import com.cg.main.model.User;


public interface IUserService {
 
	/*
	 * @Params User user
	 * 
	 * @Name addUser
	 * 
	 * @return User
	 * 
	 * @Desc: Adding a new  user
	 */
	
	 public User addUser(User user);

	 
	 /*
		 * @Params Integer appId
		 * 
		 * @Name getLic
		 * 
		 * @return User
		 * 
		 * @Desc: Getting particular 
		 */
	 public User getLic(Integer appId);
	 
	 
	 
	 
	 
	 /*
		 * @Params null
		 * 
		 * @Name getAllLic
		 * 
		 * @return List<User>
		 * 
		 * @Desc: Getting all application details
		 */
	 
	 public List<User> getAllLic();
	 
	 
	 /*
		 * @Params User oldUser
		 * 
		 * @Name updateLic
		 * 
		 * @return User
		 * 
		 * @Desc: Updating license
	*/
	public User updateLic(User oldUser);
	
	
	
	/*
	 * @Params Integer id
	 * 
	 * @Name delLic
	 * 
	 * @return Null
	 * 
	 * @Desc: Deleting license. Use for reject
	 */
	 
	 public void delLic(Integer id);
	

	 /*
		 * @Params Null 
		 * 
		 * @Name generateRandom
		 * 
		 * @return String
		 * 
		 * @Desc: Generating random string for LL and DL.
	*/
	
	 public  String generateRandom() ;

	
	 
	 /*
		 * @Params String date1, String date2
		 * 
		 * @Name getDateDiff
		 * 
		 * @return Long
		 * 
		 * @Desc: Getting date difference from one date to another. Used for renew license
	*/



	 public boolean getDateDiff(String date1, String date2 ) throws ParseException  ;
	 
	 /*
		 * @Params String sendTo, String subject,String MsgBody
		 * 
		 * @Name sendMail
		 * 
		 * @return Boolean
		 * 
		 * @Desc: Sending mail to the respective receiver
	*/
	 
	 public Boolean sendMail(String sendTo, String subject, String MsgBody);
	 
}
