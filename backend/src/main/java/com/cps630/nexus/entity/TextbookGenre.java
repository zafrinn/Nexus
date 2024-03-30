package com.cps630.nexus.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "textbook_genre")
public class TextbookGenre {
	@Id
	@Column(name = "textbook_genre_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer textbookGenreId;
	
	@Column(name = "name", nullable = false, length = 50)
	private String name;

	public Integer getTextbookGenreId() {
		return textbookGenreId;
	}

	public void setTextbookGenreId(Integer textbookGenreId) {
		this.textbookGenreId = textbookGenreId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "TextbookGenre [textbookGenreId=" + textbookGenreId + ", name=" + name + "]";
	}
}