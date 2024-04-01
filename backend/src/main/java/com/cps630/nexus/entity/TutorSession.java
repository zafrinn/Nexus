package com.cps630.nexus.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tutor_session")
public class TutorSession {
	@Id
	@Column(name = "tutor_session_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer tutorSessionId;
	
	@Column(name = "course_name", nullable = false, length = 50)
	private String courseName;
	
	@Column(name = "enabled", nullable = false)
	private Boolean enabled;

	@ManyToOne
	@JoinColumn(name = "tutor_level_id", nullable = false)
	private TutorLevel tutorLevel;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

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

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public TutorLevel getTutorLevel() {
		return tutorLevel;
	}

	public void setTutorLevel(TutorLevel tutorLevel) {
		this.tutorLevel = tutorLevel;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "TutorSession [tutorSessionId=" + tutorSessionId + ", courseName=" + courseName + ", enabled=" + enabled
				+ ", tutorLevel=" + tutorLevel + ", user=" + user + "]";
	}
}