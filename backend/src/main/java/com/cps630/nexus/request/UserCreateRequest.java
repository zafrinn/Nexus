package com.cps630.nexus.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UserCreateRequest {
	@NotEmpty
	@Size(max = 25)
	private String displayName;
	
	@NotEmpty
	@Email
	@Size(max = 50)
	private String emailAddress;
	
	@NotEmpty
	@Size(min = 8, max = 25)
	private String password1;
	
	@NotEmpty
	@Size(min = 8, max = 25)
	private String password2;

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

	public String getPassword1() {
		return password1;
	}

	public void setPassword1(String password1) {
		this.password1 = password1;
	}

	public String getPassword2() {
		return password2;
	}

	public void setPassword2(String password2) {
		this.password2 = password2;
	}
}