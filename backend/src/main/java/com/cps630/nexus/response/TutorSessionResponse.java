package com.cps630.nexus.response;

import com.cps630.nexus.entity.TutorLevel;

public class TutorSessionResponse {
	private Integer tutorSessionId;
	private String courseName;
	private TutorLevel tutorLevel;
	private String displayName;
	private String emailAddress;

	public Integer getTutorSessionId() {
		return tutorSessionId;
	}

	public void setTutorSessionId(Integer tutorSessionId) {
		this.tutorSessionId = tutorSessionId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public TutorLevel getTutorLevel() {
		return tutorLevel;
	}

	public void setTutorLevel(TutorLevel tutorLevel) {
		this.tutorLevel = tutorLevel;
	}

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