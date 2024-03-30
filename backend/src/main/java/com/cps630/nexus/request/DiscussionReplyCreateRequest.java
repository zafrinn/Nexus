package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class DiscussionReplyCreateRequest {
	@NotNull
	private Integer discussionId;
	
	@NotEmpty
	@Size(max = 1000)
	private String reply;

	public Integer getDiscussionId() {
		return discussionId;
	}

	public void setDiscussionId(Integer discussionId) {
		this.discussionId = discussionId;
	}

	public String getReply() {
		return reply;
	}

	public void setReply(String reply) {
		this.reply = reply;
	}
}