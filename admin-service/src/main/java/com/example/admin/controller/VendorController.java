package com.example.admin.controller;

import java.util.List;

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

import com.example.admin.dto.EmailDTO;
import com.example.admin.dto.EmployeeDTO;
import com.example.admin.dto.PageResponse;
import com.example.admin.dto.ServiceResponse;
import com.example.admin.dto.UpdateVendorDTO;
import com.example.admin.dto.VendorDTO;
import com.example.admin.service.VendorService;

@RestController
@RequestMapping("api/v1/vendor")
public class VendorController {

	@Autowired
	private VendorService vendorService;

	@PostMapping()
	public ResponseEntity<ServiceResponse> creatEmployee(@RequestBody VendorDTO vendorDTO) {

		VendorDTO response = vendorService.createVendor(vendorDTO);
		return new ResponseEntity<>(new ServiceResponse(response), HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<ServiceResponse> getEmployee(@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

		PageResponse<VendorDTO> response = vendorService.getVendorsByPagination(pageNo, pageSize);
		return new ResponseEntity<>(new ServiceResponse(response), HttpStatus.OK);
	}

	@PostMapping("/send-email")
	public ResponseEntity<String> getEmployee(@RequestBody List<EmailDTO> emailDTO) {

		String response = vendorService.sendEmailToVendor(emailDTO);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PutMapping()
	public ResponseEntity<ServiceResponse> updateVendor(@RequestBody UpdateVendorDTO vendorDTO) {
		VendorDTO response = vendorService.updateVendor(vendorDTO);
		return new ResponseEntity<>(new ServiceResponse(response), HttpStatus.OK);
	}

	@DeleteMapping("/{email}")
	public ResponseEntity<ServiceResponse> getEmployee(@PathVariable String email) {
		String response = vendorService.deleteVendor(email);
		return new ResponseEntity<>(new ServiceResponse(response), HttpStatus.OK);

	}
	
	@GetMapping("/{email}")
	public ResponseEntity<ServiceResponse> getEmployee(@PathVariable(value = "email") String email,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

		VendorDTO employeesByPagination = vendorService.getVendorData(email);
		return new ResponseEntity<>(new ServiceResponse(employeesByPagination), HttpStatus.OK);
	}
}
