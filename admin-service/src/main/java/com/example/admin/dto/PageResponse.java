package com.example.admin.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageResponse<T> {
	
	private List<T> data;
	private Long noOfRecords;
	private Long totalRecords;
	private Long pages;
	
	

}
