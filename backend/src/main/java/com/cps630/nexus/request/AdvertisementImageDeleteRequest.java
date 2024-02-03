package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class AdvertisementImageDeleteRequest extends AdvertisementImageAddRequest {
	@NotNull
	private Integer advertisementImageId;

	public Integer getAdvertisementImageId() {
		return advertisementImageId;
	}

	public void setAdvertisementImageId(Integer advertisementImageId) {
		this.advertisementImageId = advertisementImageId;
	}
}