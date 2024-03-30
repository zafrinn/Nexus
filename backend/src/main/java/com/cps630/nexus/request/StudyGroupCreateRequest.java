package com.cps630.nexus.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class StudyGroupCreateRequest {
	@NotNull
	private LocalDateTime timestamp;
	
	@NotEmpty
	@Size(min = 6, max = 6)
	private String room;
	
	@NotEmpty
	@Size(max = 50)
	private String courseName;
	
	@NotNull
	@Min(value = 1)
	@Max(value = 300)
	private Integer seatLimit;

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
}