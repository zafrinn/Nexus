package com.cps630.nexus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cps630.nexus.request.TutorSessionCreateRequest;
import com.cps630.nexus.request.TutorSessionUpdateRequest;
import com.cps630.nexus.service.TutorSessionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class TutorSessionController {
	@Autowired
	private TutorSessionService service;
	
	@PostMapping("/internal/basic/tutorsession/create")
	public ResponseEntity<Object> createTutorSession(@RequestBody @Valid TutorSessionCreateRequest request) {
		return service.createTutorSession(request);
	}
	
	@PostMapping("/internal/basic/tutorsession/update")
	public ResponseEntity<Object> updateTutorSession(@RequestBody @Valid TutorSessionUpdateRequest request) {
		return service.updateTutorSession(request);
	}
	
	@PostMapping("/internal/basic/tutorsession/list/get")
	public ResponseEntity<Object> getTutorSessionList() {
		return service.getTutorSessionList();
	}
}