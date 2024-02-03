package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class AdvertisementUpdateRequest extends AdvertisementCreateRequest {
	@NotNull
	private Integer advertisementId;
	
	private Boolean enabled;

	public Integer getAdvertisementId() {
		return advertisementId;
	}

	public void setAdvertisementId(Integer advertisementId) {
		this.advertisementId = advertisementId;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
}