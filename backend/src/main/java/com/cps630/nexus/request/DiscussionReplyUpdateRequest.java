package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class DiscussionReplyUpdateRequest {
	@NotNull
	private Integer discussionReplyId;
	
	@NotEmpty
	@Size(max = 1000)
	private String reply;

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
}