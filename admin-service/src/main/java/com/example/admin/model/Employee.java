package com.example.admin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "EMPLOYEE")
@Data
@NoArgsConstructor
@ToString
public class Employee {
	// name, designation, CTC, and email
	@Id
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "USER_NAME")
	private String username;
	@Column(name = "DESIGNATION")
	private String designation;
	@Column(name = "ANNUAL_SAL")
	private String ctc;

}
