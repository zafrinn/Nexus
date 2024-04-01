package com.cps630.nexus.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class BasicUserUpdateRequest {
	@NotEmpty
	@Size(max = 25)
	private String displayName;
	
	@NotEmpty
	@Email
	@Size(max = 50)
	private String emailAddress;

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
}