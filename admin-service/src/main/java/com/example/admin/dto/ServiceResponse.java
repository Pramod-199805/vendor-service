package com.example.admin.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServiceResponse {

	public Object data;
	public LocalDateTime time;

	public ServiceResponse(Object obj) {
		this.data = obj;
		this.time = LocalDateTime.now();
	}
}
