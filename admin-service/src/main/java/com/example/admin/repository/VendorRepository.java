package com.example.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.admin.model.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, String> {

}
