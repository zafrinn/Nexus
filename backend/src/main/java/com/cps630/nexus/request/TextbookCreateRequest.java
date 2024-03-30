package com.cps630.nexus.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TextbookCreateRequest {
	@NotEmpty
	@Size(max = 50)
	private String name;
	
	@NotEmpty
	@Size(max = 100)
	private String location;
	
	@NotNull
	private Integer genreId;

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

	public Integer getGenreId() {
		return genreId;
	}

	public void setGenreId(Integer genreId) {
		this.genreId = genreId;
	}
}