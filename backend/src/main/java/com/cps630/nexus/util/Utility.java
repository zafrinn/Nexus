package com.cps630.nexus.util;

import org.springframework.security.core.context.SecurityContextHolder;

import com.cps630.nexus.security.LoginDetails;

public class Utility {
	Utility() {}
	
	public static LoginDetails getAuthenticatedUser() {
		return (LoginDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
}