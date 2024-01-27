package com.cps630.nexus.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cps630.nexus.repository.UserRepository;

@Service
public class NexusUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LoginDetailsInterface loginDetails = userRepo.getLoginInfoByEmailAddress(username);
		
		if(loginDetails == null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		return new LoginDetails(loginDetails);
	}
}