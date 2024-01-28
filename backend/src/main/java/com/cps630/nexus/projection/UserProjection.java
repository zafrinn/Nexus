package com.cps630.nexus.projection;

public interface UserProjection {
	public Integer getUserId();
	public String getDisplayName();
	public String getRoleName();
	public String getEmailAddress();
	public Boolean getEnabled();
}