package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class TextbookUpdateRequest extends TextbookCreateRequest {
	@NotNull
	private Integer textbookId;
	
	@NotNull
	private Boolean enabled;

	public Integer getTextbookId() {
		return textbookId;
	}

	public void setTextbookId(Integer textbookId) {
		this.textbookId = textbookId;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
}