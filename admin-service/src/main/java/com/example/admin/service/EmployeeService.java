package com.example.admin.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.admin.dto.EmployeeDTO;
import com.example.admin.dto.PageResponse;
import com.example.admin.dto.UpdateEmailDTO;
import com.example.admin.exception.ApplicationException;
import com.example.admin.model.Employee;
import com.example.admin.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private ModelMapper mapper;

	public EmployeeDTO createEmployee(EmployeeDTO empRequest) {

		Optional<Employee> emp = employeeRepository.findById(empRequest.getEmail());
		if (emp.isPresent()) {
			throw new ApplicationException("Email already present", HttpStatus.CONFLICT);
		}
		Employee employee = mapper.map(empRequest, Employee.class);
		employeeRepository.save(employee);
		return mapper.map(employee, EmployeeDTO.class);

	}

	public EmployeeDTO updateEmployee(UpdateEmailDTO empRequest) {
		System.out.println(empRequest.getDesignation() + " " + empRequest.getEmail());
		Employee employee = employeeRepository.findById(empRequest.getEmail())
				.orElseThrow(() -> new ApplicationException("Email is not present", HttpStatus.BAD_REQUEST));
		employee = mapper.map(empRequest, Employee.class);
		employee.setDesignation(empRequest.getDesignation());
		System.out.println(employee + "EMployee Data");
		employeeRepository.save(employee);
		return mapper.map(employee, EmployeeDTO.class);

	}

	public String deleteEmployee(String email) {

		employeeRepository.findById(email)
				.orElseThrow(() -> new ApplicationException("Email is not present", HttpStatus.BAD_REQUEST));
		employeeRepository.deleteById(email);
		return "Employee delete successfully";

	}

	public PageResponse<EmployeeDTO> getEmployeesByPagination(int pageNo, int pageSize) {

		PageRequest page = PageRequest.of(pageNo - 1, pageSize);
		Page<Employee> findAllEmployee = employeeRepository.findAll(page);
		List<Employee> content = findAllEmployee.getContent();
		List<EmployeeDTO> dto = content.stream().map(emp -> mapper.map(emp, EmployeeDTO.class))
				.collect(Collectors.toList());
		PageResponse<EmployeeDTO> response = new PageResponse<EmployeeDTO>();
		response.setData(dto);
		response.setNoOfRecords((long) dto.size());
		response.setTotalRecords(findAllEmployee.getTotalElements());
		response.setPages((long) findAllEmployee.getTotalPages());
		return response;

	}

	public EmployeeDTO getEmployeeData(String email) {
		Optional<Employee> emp = employeeRepository.findById(email);
		if (!emp.isPresent()) {
			throw new ApplicationException("Email not present", HttpStatus.NOT_FOUND);
		}
		EmployeeDTO employee = mapper.map(emp, EmployeeDTO.class);
		return employee;
	}

}
