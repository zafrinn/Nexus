package com.cps630.nexus.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
	
	@Column(name = "file_name", nullable = false, length = 50)
	private String fileName;
}