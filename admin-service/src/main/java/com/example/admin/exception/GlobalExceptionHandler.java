package com.example.admin.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ApplicationException.class)
	ResponseEntity<ExceptionResponse> handleApplicationException(ApplicationException ex) {

		ExceptionResponse response = new ExceptionResponse();
		response.setMessage(ex.getMessage());
		response.setStatus(ex.getStatus());
		response.setTimeOfResponse(LocalDateTime.now());
		return new ResponseEntity<>(response, ex.getStatus());
	}

}
