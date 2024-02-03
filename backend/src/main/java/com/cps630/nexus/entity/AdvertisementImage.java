package com.cps630.nexus.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "advertisement_image")
public class AdvertisementImage {
	@Id
	@Column(name = "advertisement_image_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer advertisementImageId;
	
	@ManyToOne
	@JoinColumn(name = "advertisement_id", nullable = false)
	private Advertisement advertisement;
	
	@Column(name = "mime_type", nullable = false, length = 10)
	private String mimeType;
	
	@Lob
	@Column(name = "data", nullable = false)
	private byte[] data;

	public Integer getAdvertisementImageId() {
		return advertisementImageId;
	}

	public void setAdvertisementImageId(Integer advertisementImageId) {
		this.advertisementImageId = advertisementImageId;
	}

	public Advertisement getAdvertisement() {
		return advertisement;
	}

	public void setAdvertisement(Advertisement advertisement) {
		this.advertisement = advertisement;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}