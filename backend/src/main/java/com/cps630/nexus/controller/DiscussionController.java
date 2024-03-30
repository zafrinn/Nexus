package com.cps630.nexus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cps630.nexus.request.DiscussionCreateRequest;
import com.cps630.nexus.request.DiscussionGetRequest;
import com.cps630.nexus.request.DiscussionReplyCreateRequest;
import com.cps630.nexus.request.DiscussionReplyUpdateRequest;
import com.cps630.nexus.request.DiscussionUpdateRequest;
import com.cps630.nexus.service.DiscussionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class DiscussionController {
	@Autowired
	private DiscussionService service;
	
	@PostMapping("/internal/basic/discussion/create")
	public ResponseEntity<Object> createDiscussion(@RequestBody @Valid DiscussionCreateRequest request) {
		return service.createDiscussion(request);
	}
	
	@PostMapping("/internal/basic/discussion/update")
	public ResponseEntity<Object> updateDiscussion(@RequestBody @Valid DiscussionUpdateRequest request) {
		return service.updateDiscussion(request);
	}
	
	@PostMapping("/internal/basic/discussion/reply/create")
	public ResponseEntity<Object> createDiscussionReply(@RequestBody @Valid DiscussionReplyCreateRequest request) {
		return service.createDiscussionReply(request);
	}
	
	@PostMapping("/internal/basic/discussion/reply/update")
	public ResponseEntity<Object> updateDiscussionReply(@RequestBody @Valid DiscussionReplyUpdateRequest request) {
		return service.updateDiscussionReply(request);
	}
	
	@PostMapping("/internal/basic/discussion/list/get")
	public ResponseEntity<Object> getDiscussionList() {
		return service.getDiscussionList();
	}
	
	@PostMapping("/internal/basic/discussion/get")
	public ResponseEntity<Object> getDiscussion(@RequestBody @Valid DiscussionGetRequest request) {
		return service.getDiscussion(request);
	}
}