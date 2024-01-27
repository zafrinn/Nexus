package com.cps630.nexus.security;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class LoginRequest {
	@NotEmpty
	@Size(max = 50)
	private String username;
	
	@NotEmpty
	@Size(min = 8, max = 25)
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}