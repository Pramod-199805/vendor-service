package com.example.admin.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.admin.dto.EmailDTO;
import com.example.admin.dto.EmployeeDTO;
import com.example.admin.dto.PageResponse;
import com.example.admin.dto.UpdateVendorDTO;
import com.example.admin.dto.VendorDTO;
import com.example.admin.exception.ApplicationException;
import com.example.admin.model.Employee;
import com.example.admin.model.Vendor;
import com.example.admin.repository.VendorRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class VendorService {

	@Autowired
	private VendorRepository vendorRepository;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	JavaMailSender javaMailSender;

	public VendorDTO createVendor(VendorDTO vendorRequest) {

		Optional<Vendor> vendorExist = vendorRepository.findById(vendorRequest.getEmail());
		if (vendorExist.isPresent()) {
			throw new ApplicationException("Email already present", HttpStatus.CONFLICT);
		}
		System.out.println(vendorRequest.getIsEmailStatus() + "Email Status");
		EmailDTO email = new EmailDTO();
		email.setMailTo(vendorRequest.getEmail());
		email.setUpi(vendorRequest.getUpi());
		List<EmailDTO> emailList = Arrays.asList(email);
		Vendor vendor = mapper.map(vendorRequest, Vendor.class);
		vendor.setIsEmailStatus((vendorRequest.getIsEmailStatus()) && vendorRequest.getIsEmailStatus());
		vendorRepository.save(vendor);
		if (vendorRequest.getIsEmailStatus()) {
			sendEmailToVendor(emailList);
		}
		return mapper.map(vendor, VendorDTO.class);

	}

	public VendorDTO updateVendor(UpdateVendorDTO vendorRequest) {

		Vendor vendorExist = vendorRepository.findById(vendorRequest.getEmail())
				.orElseThrow(() -> new ApplicationException("Email is not  present", HttpStatus.NOT_FOUND));
		vendorExist.setUsername(vendorRequest.getUsername());
		vendorExist.setUpi(vendorRequest.getUpi());
		vendorRepository.save(vendorExist);
		return mapper.map(vendorExist, VendorDTO.class);

	}

	public String deleteVendor(String email) {

		vendorRepository.findById(email)
				.orElseThrow(() -> new ApplicationException("Email is not  present", HttpStatus.NOT_FOUND));
		vendorRepository.deleteById(email);
		return "Vendor delete successfully";

	}

	public PageResponse<VendorDTO> getVendorsByPagination(int pageNo, int pageSize) {

		PageRequest page = PageRequest.of(pageNo - 1, pageSize);
		Page<Vendor> findAllVendor = vendorRepository.findAll(page);
		List<Vendor> content = findAllVendor.getContent();
		List<VendorDTO> vendorRes = content.stream().map(vendor -> mapper.map(vendor, VendorDTO.class)).toList();
		PageResponse<VendorDTO> response = new PageResponse<>();
		response.setData(vendorRes);
		response.setNoOfRecords((long) vendorRes.size());
		response.setTotalRecords(findAllVendor.getTotalElements());
		response.setPages((long) findAllVendor.getTotalPages());
		return response;

	}

	public String sendEmailToVendor(List<EmailDTO> emailDTO) {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
		emailDTO.forEach(email -> {
			try {
				helper.setTo(email.getMailTo());
				helper.setFrom("noreply@gmail.com");
				helper.setSubject("Payemt Confirmation");
				helper.setText(
						String.format("Sending payments to vendor %s at upi %s", email.getMailTo(), email.getUpi()));
				javaMailSender.send(mimeMessage);
				Vendor vendor = vendorRepository.findById(email.getMailTo()).get();
				vendor.setIsEmailStatus(true);
				vendorRepository.save(vendor);

			} catch (MessagingException ex) {
				throw new ApplicationException("Something went wrong while sending mail", HttpStatus.BAD_GATEWAY);
			}
		});

		return "Mail sent successfully";
	}

	public VendorDTO getVendorData(String email) {
		Optional<Vendor> vendor = vendorRepository.findById(email);
		if (!vendor.isPresent()) {
			throw new ApplicationException("Vendor not present", HttpStatus.NOT_FOUND);
		}
		return mapper.map(vendor, VendorDTO.class);
	}
}
