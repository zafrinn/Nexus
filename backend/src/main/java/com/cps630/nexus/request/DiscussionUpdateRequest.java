package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class DiscussionUpdateRequest extends DiscussionCreateRequest {
	@NotNull
	private Integer discussionId;

	public Integer getDiscussionId() {
		return discussionId;
	}

	public void setDiscussionId(Integer discussionId) {
		this.discussionId = discussionId;
	}
}