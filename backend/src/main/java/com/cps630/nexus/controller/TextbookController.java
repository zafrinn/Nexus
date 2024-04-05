package com.cps630.nexus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cps630.nexus.request.ContactTextbookRequest;
import com.cps630.nexus.request.TextbookCreateRequest;
import com.cps630.nexus.request.TextbookUpdateRequest;
import com.cps630.nexus.service.TextbookService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class TextbookController {
	@Autowired
	private TextbookService service;
	
	/**
	 * Endpoint to create a textbook record
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/textbook/create")
	public ResponseEntity<Object> createTextbook(@RequestBody @Valid TextbookCreateRequest request) {
		return service.createTextbook(request);
	}
	
	/**
	 * Endpoint to update a textbook record
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/textbook/update")
	public ResponseEntity<Object> updateTextbook(@RequestBody @Valid TextbookUpdateRequest request) {
		return service.updateTextbook(request);
	}
	
	/**
	 * Endpoint to get a list of available textbooks
	 * @return
	 */
	@PostMapping("/internal/basic/textbook/list/get")
	public ResponseEntity<Object> getTextbookList() {
		return service.getTextbookList();
	}
	
	/**
	 * Endpoint to contact the poster of a textbook
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/textbook/contact")
	public ResponseEntity<Object> contactTextbook(@RequestBody @Valid ContactTextbookRequest request) {
		return service.contactTextbook(request);
	}
}