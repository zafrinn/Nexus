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
@Table(name = "discussion")
public class Discussion {
	@Id
	@Column(name = "discussion_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer discussionId;
	
	@Column(name = "description", nullable = false, length = 1000)
	private String description;
	
	@Column(name = "created_timestamp", nullable = false)
	private LocalDateTime createdTimestamp;
	
	@Column(name = "updated_timestamp", nullable = false)
	private LocalDateTime updatedTimestamp;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public Integer getDiscussionId() {
		return discussionId;
	}

	public void setDiscussionId(Integer discussionId) {
		this.discussionId = discussionId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public LocalDateTime getUpdatedTimestamp() {
		return updatedTimestamp;
	}

	public void setUpdatedTimestamp(LocalDateTime updatedTimestamp) {
		this.updatedTimestamp = updatedTimestamp;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Discussion [discussionId=" + discussionId + ", description=" + description + ", createdTimestamp="
				+ createdTimestamp + ", updatedTimestamp=" + updatedTimestamp + ", user=" + user + "]";
	}
}