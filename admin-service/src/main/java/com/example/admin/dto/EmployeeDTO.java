package com.example.admin.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class EmployeeDTO {

	private String email;
	private String username;
	private String designation;
	private String ctc;
}
