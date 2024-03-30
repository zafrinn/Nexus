package com.cps630.nexus.util;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.security.core.context.SecurityContextHolder;

import com.cps630.nexus.security.LoginDetails;

public class Utility {
	Utility() {}
	
	public static LoginDetails getAuthenticatedUser() {
		return (LoginDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
	
	public static String maskEmail(String email) {
		int atIndex = email.indexOf('@');
		String repeatedString = IntStream.range(0, atIndex - 2).mapToObj(i -> "*").collect(Collectors.joining());
		String maskedSubstring = email.substring(0, atIndex - repeatedString.length()) + repeatedString;
		
		return maskedSubstring + email.substring(atIndex);
	}
}