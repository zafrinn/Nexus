package com.cps630.nexus.response;

import java.time.LocalDateTime;
import java.util.List;

public class DiscussionFullResponse extends DiscussionResponse {
	private List<ReplyResponse> replyList;

	public record ReplyResponse(Integer discussionReplyId, String reply, LocalDateTime createdTimestamp, LocalDateTime updatedTimestamp, String displayName) {}

	public List<ReplyResponse> getReplyList() {
		return replyList;
	}

	public void setReplyList(List<ReplyResponse> replyList) {
		this.replyList = replyList;
	}
}