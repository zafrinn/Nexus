package com.cps630.nexus.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tutor_level")
public class TutorLevel {
	@Id
	@Column(name = "tutor_level_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer tutorLevelId;
	
	@Column(name = "name", nullable = false, length = 15)
	private String name;

	public Integer getTutorLevelId() {
		return tutorLevelId;
	}

	public void setTutorLevelId(Integer tutorLevelId) {
		this.tutorLevelId = tutorLevelId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "TutorLevel [tutorLevelId=" + tutorLevelId + ", name=" + name + "]";
	}
}