package com.example.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.admin.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

}
