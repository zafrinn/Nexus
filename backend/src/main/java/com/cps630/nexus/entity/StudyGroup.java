package com.cps630.nexus.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "study_group")
public class StudyGroup {
	@Id
	@Column(name = "study_group_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer studyGroupId;
	
	@Column(name = "timestamp", nullable = false)
	private LocalDateTime timestamp;
	
	@Column(name = "room", nullable = false, length = 7)
	private String room;
	
	@Column(name = "course_name", nullable = false, length = 50)
	private String courseName;
	
	@Column(name = "seat_limit", nullable = false)
	private Integer seatLimit;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "StudyGroup [studyGroupId=" + studyGroupId + ", timestamp=" + timestamp + ", room=" + room
				+ ", courseName=" + courseName + ", seatLimit=" + seatLimit + ", user=" + user + "]";
	}
}