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
@Table(name = "discussion_reply")
public class DiscussionReply {
	@Id
	@Column(name = "discussion_reply_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer discussionReplyId;
	
	@ManyToOne
	@JoinColumn(name = "discussion_id", nullable = false)
	private Discussion discussion;
	
	@Column(name = "reply", nullable = false, length = 1000)
	private String reply;
	
	@Column(name = "created_timestamp", nullable = false)
	private LocalDateTime createdTimestamp;
	
	@Column(name = "updated_timestamp", nullable = false)
	private LocalDateTime updatedTimestamp;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public Integer getDiscussionReplyId() {
		return discussionReplyId;
	}

	public void setDiscussionReplyId(Integer discussionReplyId) {
		this.discussionReplyId = discussionReplyId;
	}

	public Discussion getDiscussion() {
		return discussion;
	}

	public void setDiscussion(Discussion discussion) {
		this.discussion = discussion;
	}

	public String getReply() {
		return reply;
	}

	public void setReply(String reply) {
		this.reply = reply;
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
		return "DiscussionReply [discussionReplyId=" + discussionReplyId + ", discussion=" + discussion + ", reply="
				+ reply + ", createdTimestamp=" + createdTimestamp + ", updatedTimestamp=" + updatedTimestamp
				+ ", user=" + user + "]";
	}
}