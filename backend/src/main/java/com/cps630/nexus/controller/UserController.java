package com.cps630.nexus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cps630.nexus.request.AdminUserUpdateRequest;
import com.cps630.nexus.request.BasicUserUpdateRequest;
import com.cps630.nexus.request.PasswordResetRequest;
import com.cps630.nexus.request.PasswordUpdateRequest;
import com.cps630.nexus.request.UserCreateRequest;
import com.cps630.nexus.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	private UserService service;
	
	@PostMapping("/internal/basic/password/update")
	public ResponseEntity<Object> updatePassword(@RequestBody @Valid PasswordUpdateRequest request) {
		return service.updatePassword(request);
	}
	
	@PostMapping("/external/password/reset")
	public ResponseEntity<Object> resetPassword(@RequestBody @Valid PasswordResetRequest request) {
		return service.resetPassword(request);
	}
	
	@PostMapping("/internal/admin/user/list/get")
	public ResponseEntity<Object> getUserList() {
		return service.getUserList();
	}
	
	@PostMapping("/internal/basic/user/get")
	public ResponseEntity<Object> getAutheticatedUser() {
		return service.getAutheticatedUser();
	}
	
	@PostMapping("/external/user/create")
	public ResponseEntity<Object> createUser(@RequestBody @Valid UserCreateRequest request) {
		return service.createUser(request);
	}
	
	@PostMapping("/internal/basic/user/update")
	public ResponseEntity<Object> updateUserBasic(@RequestBody @Valid BasicUserUpdateRequest request) {
		return service.updateUserBasic(request);
	}
	
	@PostMapping("/internal/admin/user/update")
	public ResponseEntity<Object> updateUserAdmin(@RequestBody @Valid AdminUserUpdateRequest request) {
		return service.updateUserAdmin(request);
	}
}