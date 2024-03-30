package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class DiscussionCreateRequest {
	@NotEmpty
	@Size(max = 1000)
	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}