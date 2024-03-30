package com.cps630.nexus.response;

import java.time.LocalDateTime;

public class DiscussionResponse {
	private Integer discussionid;
	private String description;
	private LocalDateTime createdTimestamp;
	private LocalDateTime updatedTimestamp;
	private String displayName;

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
}