package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class AdvertisementImageAddRequest {
	@NotNull
	private Integer advertisementId;

	public Integer getAdvertisementId() {
		return advertisementId;
	}

	public void setAdvertisementId(Integer advertisementId) {
		this.advertisementId = advertisementId;
	}
}