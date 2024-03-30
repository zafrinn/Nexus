package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class TutorSessionUpdateRequest extends TutorSessionCreateRequest {
	@NotNull
	private Integer tutorSessionId;

	public Integer getTutorSessionId() {
		return tutorSessionId;
	}

	public void setTutorSessionId(Integer tutorSessionId) {
		this.tutorSessionId = tutorSessionId;
	}
}