package com.cps630.nexus.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cps630.nexus.entity.Role;
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.RoleRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.AdminUserUpdateRequest;
import com.cps630.nexus.request.BasicUserUpdateRequest;
import com.cps630.nexus.request.PasswordResetRequest;
import com.cps630.nexus.request.PasswordUpdateRequest;
import com.cps630.nexus.request.UserCreateRequest;
import com.cps630.nexus.security.SecurityConfig;
import com.cps630.nexus.util.ConstantUtil;
import com.cps630.nexus.util.Utility;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	Random random = new Random();
	
	public ResponseEntity<Object> updatePassword(PasswordUpdateRequest request) {
		if(!StringUtils.isAsciiPrintable(request.getPassword1()) || !StringUtils.isAsciiPrintable(request.getPassword2())) {
			return new ResponseEntity<>(ConstantUtil.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
		}
		
		if(!StringUtils.equals(request.getPassword1(), request.getPassword2())) {
			return new ResponseEntity<>(ConstantUtil.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
		}
		
		userRepo.updatePassword(SecurityConfig.getPasswordEncoder().encode(request.getPassword1()), Utility.getAuthenticatedUser().getUserId());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> resetPassword(PasswordResetRequest request) {
		Optional<User> userOpt = userRepo.findByEmailAddress(request.getUsername());
		
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
		
		System.out.println("Random password: " + password);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> getUserList() {
		return new ResponseEntity<>(userRepo.getUserList(), HttpStatus.OK);
	}

	public ResponseEntity<Object> createUser(UserCreateRequest request) {
		if(!StringUtils.isAlphanumeric(request.getDisplayName())) {
			return new ResponseEntity<>(ConstantUtil.INVALID_DISPLAY_NAME, HttpStatus.BAD_REQUEST);
		}
		
		if(!StringUtils.isAsciiPrintable(request.getPassword1()) || !StringUtils.isAsciiPrintable(request.getPassword2())) {
			return new ResponseEntity<>(ConstantUtil.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
		}
		
		if(!StringUtils.equals(request.getPassword1(), request.getPassword2())) {
			return new ResponseEntity<>(ConstantUtil.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
		}
		
		Optional<User> userOpt = userRepo.findByEmailAddress(request.getEmailAddress());
		
		if(userOpt.isPresent()) {
			return new ResponseEntity<>(ConstantUtil.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
		}
		
		Optional<Role> roleOpt = roleRepo.findById(1);
		
		if(roleOpt.isEmpty()) {
			return new ResponseEntity<>(ConstantUtil.ROLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		
		User user = new User();
		
		user.setDisplayName(request.getDisplayName());
		user.setRole(roleOpt.get());
		user.setEmailAddress(request.getEmailAddress());
		user.setPassword(SecurityConfig.getPasswordEncoder().encode(request.getPassword1()));
		user.setEnabled(Boolean.TRUE);
		user.setCreatedTimestamp(LocalDateTime.now());
		
		userRepo.save(user);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> updateUserBasic(BasicUserUpdateRequest request) {
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(ConstantUtil.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		
		User user = userOpt.get();
		
		user.setDisplayName(request.getDisplayName());
		user.setEmailAddress(request.getEmailAddress());
		
		userRepo.save(user);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> updateUserAdmin(AdminUserUpdateRequest request) {
		Optional<User> userOpt = userRepo.findById(request.getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(ConstantUtil.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		
		Optional<Role> roleOpt = roleRepo.findById(request.getRoleId());
		
		if(roleOpt.isEmpty()) {
			return new ResponseEntity<>(ConstantUtil.ROLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		
		User user = userOpt.get();
		
		user.setDisplayName(request.getDisplayName());
		user.setRole(roleOpt.get());
		user.setEmailAddress(request.getEmailAddress());
		user.setEnabled(request.getEnabled());
		
		userRepo.save(user);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
}