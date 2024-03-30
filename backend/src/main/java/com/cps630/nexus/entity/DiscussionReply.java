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
	
	@Column(name = "timestamp", nullable = false)
	private LocalDateTime timestamp;
	
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

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
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
				+ reply + ", timestamp=" + timestamp + ", user=" + user + "]";
	}
}