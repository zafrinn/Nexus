package com.cps630.nexus.response;

import java.util.List;

public class StudyGroupFullResponse extends StudyGroupResponse {
	private List<AttendeeResponse> attendeeList;

	public record AttendeeResponse(String displayName, String emailAddress) {}

	public List<AttendeeResponse> getAttendeeList() {
		return attendeeList;
	}

	public void setAttendeeList(List<AttendeeResponse> attendeeList) {
		this.attendeeList = attendeeList;
	}
}