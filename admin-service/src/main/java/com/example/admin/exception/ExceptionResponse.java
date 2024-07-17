package com.example.admin.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ExceptionResponse {
	
	private String message;
	private HttpStatus status;
	private LocalDateTime timeOfResponse;

}
