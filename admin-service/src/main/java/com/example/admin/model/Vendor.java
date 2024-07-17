package com.example.admin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "VENDOR")
@Data
@NoArgsConstructor
public class Vendor {
	
	@Id
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "USER_NAME")
	private String username;
	@Column(name = "UPI")
	private String upi;
	@Column(name = "EMAIL_STATUS")
	private Boolean isEmailStatus;

}
