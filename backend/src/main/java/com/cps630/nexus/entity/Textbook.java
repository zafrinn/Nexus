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
@Table(name = "textbook")
public class Textbook {
	@Id
	@Column(name = "textbook_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer textbookId;
	
	@Column(name = "name", nullable = false, length = 50)
	private String name;
	
	@Column(name = "enabled", nullable = false)
	private Boolean enabled;
	
	@Column(name = "location", nullable = false, length = 100)
	private String location;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "textbook_genre_id", nullable = false)
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

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TextbookGenre getGenre() {
		return genre;
	}

	public void setGenre(TextbookGenre genre) {
		this.genre = genre;
	}

	@Override
	public String toString() {
		return "Textbook [textbookId=" + textbookId + ", name=" + name + ", enabled=" + enabled + ", location="
				+ location + ", user=" + user + ", genre=" + genre + "]";
	}
}