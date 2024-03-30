package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TutorSessionCreateRequest {
	@NotEmpty
	@Size
	private String courseName;
	
	@NotNull
	private Integer tutorLevelId;

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public Integer getTutorLevelId() {
		return tutorLevelId;
	}

	public void setTutorLevelId(Integer tutorLevelId) {
		this.tutorLevelId = tutorLevelId;
	}
}