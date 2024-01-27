package com.cps630.nexus.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class LoginDetails implements UserDetails {
	private static final long serialVersionUID = 2913300004766712110L;
	
	private transient LoginDetailsInterface detailsDTO;
	
	public LoginDetails(LoginDetailsInterface detailsDTO) {
		this.detailsDTO = detailsDTO;
	}
		
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
		
		authorityList.add(new SimpleGrantedAuthority(detailsDTO.getRoleName()));
		
		return authorityList;
	}
	
	public Integer getUserId() {
		return detailsDTO.getUserId();
	}

	@Override
	public String getPassword() {
		return detailsDTO.getPassword();
	}

	@Override
	public String getUsername() {
		return detailsDTO.getEmailAddress();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return detailsDTO.getEnabled();
	}
}