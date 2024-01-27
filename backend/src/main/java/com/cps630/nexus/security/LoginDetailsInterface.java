package com.cps630.nexus.security;

public interface LoginDetailsInterface {
	Integer getUserId();
	String getEmailAddress();
	Boolean getEnabled();
	String getRoleName();
	String getPassword();
}