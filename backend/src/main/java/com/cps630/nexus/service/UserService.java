package com.cps630.nexus.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.PasswordResetRequest;
import com.cps630.nexus.request.PasswordUpdateRequest;
import com.cps630.nexus.security.LoginDetails;
import com.cps630.nexus.security.SecurityConfig;
import com.cps630.nexus.util.ConstantUtil;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	
	Random random = new Random();
	
	public ResponseEntity<Object> updatePassword(PasswordUpdateRequest request) {
		LoginDetails loginDetails = (LoginDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); // Currently logged in user
		
		userRepo.updatePassword(SecurityConfig.getPasswordEncoder().encode(request.getPassword()), loginDetails.getUserId());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> resetPassword(PasswordResetRequest request) {
		Optional<User> userOpt = userRepo.findUserByEmailAddress(request.getUsername());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(ConstantUtil.INVALID_USERNAME, HttpStatus.BAD_REQUEST);
		}
		
		String[] alphabet = {"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
		StringBuilder password = new StringBuilder();

        for(int i = 0; i < 5; i++) {
            password.append(alphabet[random.nextInt(alphabet.length - 1)]);
        }

        for(int j = 0; j < 3; j++) {
        	password.append(random.nextInt(9));
        }		
        
		userRepo.updatePassword(SecurityConfig.getPasswordEncoder().encode(password.toString()), userOpt.get().getUserId());
		
		return new ResponseEntity<>(password, HttpStatus.OK);
	}
}