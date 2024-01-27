package com.cps630.nexus.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	@Id
	@Column(name = "user_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
	@Column(name = "display_name", nullable = false, length = 25)
	private String displayName;

	@OneToOne
	@JoinColumn(name = "role_id", nullable = false)
	private Role role;
	
	@Column(name = "email_address", nullable = false, length = 50)
	private String emailAddress;
	
	@Column(name = "created_timestamp", nullable = false)
	private LocalDateTime createdTimestamp;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public LocalDateTime getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", displayName=" + displayName + ", role=" + role + ", emailAddress="
				+ emailAddress + ", createdTimestamp=" + createdTimestamp + "]";
	}
}