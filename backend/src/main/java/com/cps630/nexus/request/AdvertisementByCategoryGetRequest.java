package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class AdvertisementByCategoryGetRequest {
	@NotNull
	private Integer categoryId;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
}