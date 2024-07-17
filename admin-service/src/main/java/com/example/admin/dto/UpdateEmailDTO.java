package com.example.admin.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateEmailDTO {

	private String email;
	private String username;
	private String designation;
	private String ctc;
}
