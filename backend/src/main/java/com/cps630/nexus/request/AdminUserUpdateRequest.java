package com.cps630.nexus.request;

import jakarta.validation.constraints.NotNull;

public class AdminUserUpdateRequest extends BasicUserUpdateRequest {
	@NotNull
	private Integer userId;
	
	@NotNull
	private Integer roleId;
	
	@NotNull
	private Boolean enabled;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
}