package com.cps630.nexus.response;

import com.cps630.nexus.entity.TextbookGenre;

public class TextbookResponse {
	private Integer textbookId;
	private String name;
	private String location;
	private String displayName;
	private String emailAddress;
	private TextbookGenre genre;

	public Integer getTextbookId() {
		return textbookId;
	}

	public void setTextbookId(Integer textbookId) {
		this.textbookId = textbookId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public TextbookGenre getGenre() {
		return genre;
	}

	public void setGenre(TextbookGenre genre) {
		this.genre = genre;
	}
}