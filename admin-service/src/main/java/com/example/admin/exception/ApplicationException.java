package com.example.admin.exception;

import org.springframework.http.HttpStatus;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class ApplicationException extends RuntimeException {
	
	private HttpStatus status;
	public ApplicationException(String message,HttpStatus status) {
		super(message);
		this.status = status;
	}

}
