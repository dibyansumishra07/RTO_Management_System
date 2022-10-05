package com.cg.main.service;

/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [19:44]
 */
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.mail.internet.MimeMessage;
import javax.mail.MessagingException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import com.cg.main.dao.IUserDao;
import com.cg.main.model.User;

@Service
@Transactional
public class UserService implements IUserService{
	
	//Wiring service with IRtoDao 
	@Autowired
	private IUserDao dao;
	
	 @Autowired
	 private JavaMailSender sender;
	 
	/*
	 * @Params User user
	 * 
	 * @Name addUser
	 * 
	 * @return User
	 * 
	 * @Desc: Adding a new  user
	 */
	
	@Override
	 public User addUser(User user) {
		User user1=dao.save(user);
		return user1;
	 }
	
	/*
	 * @Params Integer appId
	 * 
	 * @Name getLic
	 * 
	 * @return User
	 * 
	 * @Desc: Getting particular 
	 */
	
	@Override
	 public User getLic(Integer appId){
			User user = dao.findById(appId).get();
			return user;
	}
	 
	

	/*
	 * @Params null
	 * 
	 * @Name getAllLic
	 * 
	 * @return List<User>
	 * 
	 * @Desc: Getting all application details
	 */
	
	
	  @Override
	  public List<User> getAllLic(){
		  List<User> list = new ArrayList<>();
		  Iterable<User> iterable = dao.findAll(); Iterator<User> iterator = iterable.iterator();
	  
		  while (iterator.hasNext()) {
			  User usr = iterator.next(); list.add(usr); 
			  }
		  return list;
	  }
	  
	  
	  /*
		 * @Params Integer id
		 * 
		 * @Name delLic
		 * 
		 * @return Null
		 * 
		 * @Desc: Deleting license. Use for reject
		 */
		 
		 public void delLic(Integer id) {
			 dao.deleteById(id);
		 }
	  
	  

	 /*
		 * @Params User oldUser
		 * 
		 * @Name updateLic
		 * 
		 * @return User
		 * 
		 * @Desc: Updating license
	*/
	  
	  @Override
	  public User updateLic(User oldUser) {
		  User newUser=dao.save(oldUser);
		  return newUser;
	  }
	  
	  
	  

	 /*
		 * @Params Null 
		 * 
		 * @Name generateRandom
		 * 
		 * @return String
		 * 
		 * @Desc: Generating random string for LL and DL.
	*/
	  
	  @Override
//	  Generating random LL and DL as well
	  public  String generateRandom() {
	    	 String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789"  + "abcdefghijklmnopqrstuvxyz";                 
	    	 StringBuilder sb = new StringBuilder(6); 

			for (int i = 0; i < 6; i++) { 
				int index = (int)(str.length()  * Math.random()); 			
				sb.append(str.charAt(index)); 
			} 
			return sb.toString();
	   }
	  
	  

	  /*
			 * @Params String date1, String date2
			 * 
			 * @Name getDateDiff
			 * 
			 * @return Long
			 * 
			 * @Desc: Getting date difference from one date to another. Used for renew license
		*/
	  
	  public boolean getDateDiff(String date1,String date2) throws ParseException  {
		  Date dt1=new SimpleDateFormat("dd/MM/yyyy").parse(date1);
	      Date dt2=new SimpleDateFormat("dd/MM/yyyy").parse(date2);
	      long diffInMillies =dt1.getTime() - dt2.getTime();
	      long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
	      if(diff<0) {
	       	return false;
	       }
	       else {
	       	return true;
	       }
	    }
	  /*
		 * @Params String sendTo, String subject,String MsgBody
		 * 
		 * @Name sendMail
		 * 
		 * @return Boolean
		 * 
		 * @Desc: Sending mail to the respective receiver
	*/
	  public Boolean sendMail(String sendTo, String subject, String MsgBody) {
	        MimeMessage message = sender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message);

	        try {
	            helper.setTo(sendTo);
	            helper.setSubject(subject);
	            helper.setText(MsgBody);
	        } catch (MessagingException e) {
	            e.printStackTrace();
	            return false;
	        }
	        sender.send(message);
	        return true;
	    }
}
