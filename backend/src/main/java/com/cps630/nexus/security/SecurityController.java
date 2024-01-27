package com.cps630.nexus.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class SecurityController {	
	@PostMapping("/external/login")
	public ResponseEntity<Object> login(@RequestBody @Valid LoginRequest request, HttpServletRequest httpRequest) {
		try {
			httpRequest.login(request.getUsername(), request.getPassword());
		}
		
		catch(Exception ex) {
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/external/logout")
	public ResponseEntity<Object> logout(Authentication auth, HttpServletRequest request, HttpServletResponse response) {
		if(auth == null) {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
		
		SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
		
		logoutHandler.logout(request, response, auth);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
}