package com.example.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.admin.dto.EmployeeDTO;
import com.example.admin.dto.PageResponse;
import com.example.admin.dto.ServiceResponse;
import com.example.admin.dto.UpdateEmailDTO;
import com.example.admin.service.EmployeeService;

@RestController
@RequestMapping("api/v1/employee")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@PostMapping()
	public ResponseEntity<ServiceResponse> creatEmployee(@RequestBody EmployeeDTO employeeDTO) {
		System.out.println(employeeDTO);
		EmployeeDTO response = employeeService.createEmployee(employeeDTO);
		ServiceResponse serviceResponse = new ServiceResponse(response);
		return new ResponseEntity<>(serviceResponse, HttpStatus.CREATED);
	}

	@GetMapping()
	public ResponseEntity<ServiceResponse> getAllEmployee(@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

		PageResponse<EmployeeDTO> employeesByPagination = employeeService.getEmployeesByPagination(pageNo, pageSize);
		return new ResponseEntity<>(new ServiceResponse(employeesByPagination), HttpStatus.OK);
	}
	
	@GetMapping("/{email}")
	public ResponseEntity<ServiceResponse> getEmployee(@PathVariable(value = "email") String email,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

		EmployeeDTO employeesByPagination = employeeService.getEmployeeData(email);
		return new ResponseEntity<>(new ServiceResponse(employeesByPagination), HttpStatus.OK);
	}

	@PutMapping()
	public ResponseEntity<ServiceResponse> updateEmployee(@RequestBody UpdateEmailDTO employeeDTO) {
		EmployeeDTO employeesByPagination = employeeService.updateEmployee(employeeDTO);
		return new ResponseEntity<>(new ServiceResponse(employeesByPagination), HttpStatus.OK);
	}

	@DeleteMapping("/{email}")
	public ResponseEntity<ServiceResponse> deleteEmployee(@PathVariable String email) {
		String response = employeeService.deleteEmployee(email);
		return new ResponseEntity<>(new ServiceResponse(response), HttpStatus.OK);
	}

}
