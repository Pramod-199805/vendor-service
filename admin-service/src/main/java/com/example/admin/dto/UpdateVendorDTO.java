package com.example.admin.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateVendorDTO {

	private String email;
	private String username;
	private String upi;
}
