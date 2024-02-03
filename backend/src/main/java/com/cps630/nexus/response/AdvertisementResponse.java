package com.cps630.nexus.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class AdvertisementResponse {
	private Integer advertisementId;
	private String displayName;
	private String title;
	private String description;
	private LocalDateTime createdTimestamp;
	private BigDecimal price;
	private String location;
	private Boolean enabled;
	private List<AdvertisementImageResponse> imageList;
	
	public record AdvertisementImageResponse(Integer advertisementImageId, String mimeType, byte[] data) {
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + Arrays.hashCode(data);
			result = prime * result + Objects.hash(advertisementImageId, mimeType);
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			AdvertisementImageResponse other = (AdvertisementImageResponse) obj;
			return Objects.equals(advertisementImageId, other.advertisementImageId) && Arrays.equals(data, other.data)
					&& Objects.equals(mimeType, other.mimeType);
		}

		@Override
		public String toString() {
			return "AdvertisementImageResponse [advertisementImageId=" + advertisementImageId + ", mimeType=" + mimeType
					+ ", data=" + Arrays.toString(data) + "]";
		}
	}

	public Integer getAdvertisementId() {
		return advertisementId;
	}

	public void setAdvertisementId(Integer advertisementId) {
		this.advertisementId = advertisementId;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public List<AdvertisementImageResponse> getImageList() {
		return imageList;
	}

	public void setImageList(List<AdvertisementImageResponse> imageList) {
		this.imageList = imageList;
	}
}