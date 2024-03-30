package com.cps630.nexus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cps630.nexus.request.TextbookCreateRequest;
import com.cps630.nexus.request.TextbookUpdateRequest;
import com.cps630.nexus.service.TextbookService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class TextbookController {
	@Autowired
	private TextbookService service;
	
	@PostMapping("/internal/basic/textbook/create")
	public ResponseEntity<Object> createTextbook(@RequestBody @Valid TextbookCreateRequest request) {
		return service.createTextbook(request);
	}
	
	@PostMapping("/internal/basic/textbook/update")
	public ResponseEntity<Object> updateTextbook(@RequestBody @Valid TextbookUpdateRequest request) {
		return service.updateTextbook(request);
	}
	
	@PostMapping("/internal/basic/textbook/list/get")
	public ResponseEntity<Object> getTextbookList() {
		return service.getTextbookList();
	}
}