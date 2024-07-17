package com.example.admin.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VendorDTO {

	private String email;
	private String username;
	private String upi;
	private Boolean isEmailStatus;
}
