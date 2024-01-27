package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;

public class PasswordResetRequest {
	@NotEmpty
	private String username;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}