package com.cg.main.dao;
/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [18:42]
 */
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.main.model.User;



@Repository
public interface IUserDao extends JpaRepository<User, Integer> { 
}
