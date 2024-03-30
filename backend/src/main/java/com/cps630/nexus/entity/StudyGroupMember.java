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
@Table(name = "study_group_member")
public class StudyGroupMember {
	@Id
	@Column(name = "study_group_member_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer studyGroupMemberId;
	
	@ManyToOne
	@JoinColumn(name = "study_group_id", nullable = false)
	private StudyGroup studyGroup;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public Integer getStudyGroupMemberId() {
		return studyGroupMemberId;
	}

	public void setStudyGroupMemberId(Integer studyGroupMemberId) {
		this.studyGroupMemberId = studyGroupMemberId;
	}

	public StudyGroup getStudyGroup() {
		return studyGroup;
	}

	public void setStudyGroup(StudyGroup studyGroup) {
		this.studyGroup = studyGroup;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "StudyGroupMember [studyGroupMemberId=" + studyGroupMemberId + ", studyGroup=" + studyGroup + ", user="
				+ user + "]";
	}
}