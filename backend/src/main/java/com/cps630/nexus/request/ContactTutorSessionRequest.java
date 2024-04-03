package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ContactTutorSessionRequest {
	@NotNull
	private Integer tutorSessionId;

	@NotEmpty
	@Size(max = 500)
	private String message;

	public Integer getTutorSessionId() {
		return tutorSessionId;
	}

	public void setTutorSessionId(Integer tutorSessionId) {
		this.tutorSessionId = tutorSessionId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}