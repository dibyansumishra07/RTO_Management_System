package com.cg.main.exception;

/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [18:42]
 */

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RtoException {
	
	/*
	  * @Params: null
	  * @Name: applyDl
	  * @Return: Exeption handler message
	  * @PassByUrl: null
	  * @PassJsonVariables: {Null}
	  * @Desc: Handling Exception
	  */

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<Object> handleException() {
		return new ResponseEntity<Object>("Sorry Error Occured, No details found", HttpStatus.NOT_FOUND);
	}
}
