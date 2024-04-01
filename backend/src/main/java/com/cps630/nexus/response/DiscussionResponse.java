package com.cps630.nexus.response;

import java.time.LocalDateTime;

public class DiscussionResponse {
	private Integer discussionid;
	private String description;
	private LocalDateTime createdTimestamp;
	private LocalDateTime updatedTimestamp;
	private String displayName;
	private Integer discussionReplyId;
	private String reply;
	private LocalDateTime replyCreatedTimestamp;
	private LocalDateTime replyUpdatedTimestamp;
	private String replyDisplayName;

	public Integer getDiscussionid() {
		return discussionid;
	}

	public void setDiscussionid(Integer discussionid) {
		this.discussionid = discussionid;
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

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public Integer getDiscussionReplyId() {
		return discussionReplyId;
	}

	public void setDiscussionReplyId(Integer discussionReplyId) {
		this.discussionReplyId = discussionReplyId;
	}

	public String getReply() {
		return reply;
	}

	public void setReply(String reply) {
		this.reply = reply;
	}

	public LocalDateTime getReplyCreatedTimestamp() {
		return replyCreatedTimestamp;
	}

	public void setReplyCreatedTimestamp(LocalDateTime replyCreatedTimestamp) {
		this.replyCreatedTimestamp = replyCreatedTimestamp;
	}

	public LocalDateTime getReplyUpdatedTimestamp() {
		return replyUpdatedTimestamp;
	}

	public void setReplyUpdatedTimestamp(LocalDateTime replyUpdatedTimestamp) {
		this.replyUpdatedTimestamp = replyUpdatedTimestamp;
	}

	public String getReplyDisplayName() {
		return replyDisplayName;
	}

	public void setReplyDisplayName(String replyDisplayName) {
		this.replyDisplayName = replyDisplayName;
	}

}