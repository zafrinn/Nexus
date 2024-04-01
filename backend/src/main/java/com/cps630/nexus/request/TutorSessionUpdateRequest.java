package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class TutorSessionUpdateRequest extends TutorSessionCreateRequest {
	@NotNull
	private Integer tutorSessionId;
	
	@NotNull
	private Boolean enabled;

	public Integer getTutorSessionId() {
		return tutorSessionId;
	}

	public void setTutorSessionId(Integer tutorSessionId) {
		this.tutorSessionId = tutorSessionId;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
}