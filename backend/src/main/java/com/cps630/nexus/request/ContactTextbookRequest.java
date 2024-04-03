package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ContactTextbookRequest {
	@NotNull
	private Integer textbookId;

	@NotEmpty
	@Size(max = 500)
	private String message;

	public Integer getTextbookId() {
		return textbookId;
	}

	public void setTextbookId(Integer textbookId) {
		this.textbookId = textbookId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}