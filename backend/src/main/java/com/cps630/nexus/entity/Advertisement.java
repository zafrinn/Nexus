package com.cps630.nexus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "advertisement")
public class Advertisement {
	@Id
	@Column(name = "advertisement_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer advertisementId;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@Column(name = "title", nullable = false, length = 50)
	private String title;
	
	@Column(name = "description", nullable = false, length = 1000)
	private String description;
	
	@Column(name = "created_timestamp", nullable = false)
	private LocalDateTime createdTimestamp;
	
	@ManyToOne
	@JoinColumn(name = "category", nullable = false)
	private Category category;
	
	@Column(name = "price", nullable = true)
	private BigDecimal price;
	
	@Column(name = "location", nullable = true, length = 100)
	private String location;

	public Integer getAdvertisementId() {
		return advertisementId;
	}

	public void setAdvertisementId(Integer advertisementId) {
		this.advertisementId = advertisementId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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

	@Override
	public String toString() {
		return "Advertisement [advertisementId=" + advertisementId + ", user=" + user + ", title=" + title
				+ ", description=" + description + ", createdTimestamp=" + createdTimestamp + ", category=" + category
				+ ", price=" + price + ", location=" + location + "]";
	}
}