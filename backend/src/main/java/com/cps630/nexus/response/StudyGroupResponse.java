package com.cps630.nexus.response;

import java.time.LocalDateTime;

public class StudyGroupResponse {
	private Integer studyGroupId;
	private LocalDateTime timestamp;
	private String room;
	private String courseName;
	private Integer seatLimit;
	private String displayName;
	private String emailAddress;

	public Integer getStudyGroupId() {
		return studyGroupId;
	}

	public void setStudyGroupId(Integer studyGroupId) {
		this.studyGroupId = studyGroupId;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public Integer getSeatLimit() {
		return seatLimit;
	}

	public void setSeatLimit(Integer seatLimit) {
		this.seatLimit = seatLimit;
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