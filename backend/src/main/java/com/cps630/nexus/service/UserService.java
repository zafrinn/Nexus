package com.cps630.nexus.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cps630.nexus.entity.ErrorInfo;
import com.cps630.nexus.entity.Role;
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.RoleRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.AdminUserUpdateRequest;
import com.cps630.nexus.request.BasicUserUpdateRequest;
import com.cps630.nexus.request.PasswordResetRequest;
import com.cps630.nexus.request.PasswordUpdateRequest;
import com.cps630.nexus.request.UserCreateRequest;
import com.cps630.nexus.response.UserResponse;
import com.cps630.nexus.security.SecurityConfig;
import com.cps630.nexus.util.ConstantUtil;
import com.cps630.nexus.util.EmailUtility;
import com.cps630.nexus.util.Utility;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	Random random = new Random();
	
	public ResponseEntity<Object> updatePassword(PasswordUpdateRequest request) {
		// Verify that password does not have special characters
		if(!StringUtils.isAsciiPrintable(request.getPassword1()) || !StringUtils.isAsciiPrintable(request.getPassword2())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_PASSWORD), HttpStatus.BAD_REQUEST);
		}
		
		if(!StringUtils.equals(request.getPassword1(), request.getPassword2())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.PASSWORD_MISMATCH), HttpStatus.BAD_REQUEST);
		}
		
		userRepo.updatePassword(SecurityConfig.getPasswordEncoder().encode(request.getPassword1()), Utility.getAuthenticatedUser().getUserId());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> resetPassword(PasswordResetRequest request) {
		Optional<User> userOpt = userRepo.getByEmailAddress(request.getUsername());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USERNAME), HttpStatus.BAD_REQUEST);
		}
		
		User user = userOpt.get();
		
		String[] alphabet = {"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
		StringBuilder password = new StringBuilder();

        for(int i = 0; i < 5; i++) {
            password.append(alphabet[random.nextInt(alphabet.length - 1)]);
        }

        for(int j = 0; j < 3; j++) {
        	password.append(random.nextInt(9));
        }		
        
		userRepo.updatePassword(SecurityConfig.getPasswordEncoder().encode(password.toString()), user.getUserId());
		
		EmailUtility.sendEmail(user.getEmailAddress(), "Nexus: Temporary Password", "Your password has been reset to: " + password);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> getUserList() {
		List<User> userList = userRepo.getUserList();
		
		List<UserResponse> userResponseList = new ArrayList<>();
		
		for(User user : userList) {
			UserResponse responseObj = new UserResponse();
			responseObj.setUserId(user.getUserId());
			responseObj.setDisplayName(user.getDisplayName());
			responseObj.setRoleName(user.getRole().getName());
			responseObj.setEmailAddress(user.getEmailAddress());
			responseObj.setEnabled(user.getEnabled());
			
			userResponseList.add(responseObj);
		}
		
		return new ResponseEntity<>(userResponseList, HttpStatus.OK);
	}
	
	public ResponseEntity<Object> getAutheticatedUser() {
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		User user = userOpt.get();
		
		UserResponse responseObj = new UserResponse();
		responseObj.setUserId(user.getUserId());
		responseObj.setDisplayName(user.getDisplayName());
		responseObj.setRoleName(user.getRole().getName());
		responseObj.setEmailAddress(user.getEmailAddress());
		responseObj.setEnabled(user.getEnabled());
		
		return new ResponseEntity<>(responseObj, HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> createUser(UserCreateRequest request) {
		// Verify that display name is alphanumeric
		if(!StringUtils.isAlphanumeric(request.getDisplayName())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_DISPLAY_NAME), HttpStatus.BAD_REQUEST);
		}
		
		// Verify that password does not have special characters
		if(!StringUtils.isAsciiPrintable(request.getPassword1()) || !StringUtils.isAsciiPrintable(request.getPassword2())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_PASSWORD), HttpStatus.BAD_REQUEST);
		}
		
		if(!StringUtils.equals(request.getPassword1(), request.getPassword2())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.PASSWORD_MISMATCH), HttpStatus.BAD_REQUEST);
		}
		
		Optional<User> userOpt = userRepo.getByEmailAddress(request.getEmailAddress());
		
		if(userOpt.isPresent()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_ALREADY_EXISTS), HttpStatus.BAD_REQUEST);
		}
		
		Optional<Role> roleOpt = roleRepo.findById(2);
		
		if(roleOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ROLE_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		User user = new User();
		
		user.setDisplayName(request.getDisplayName());
		user.setRole(roleOpt.get());
		user.setEmailAddress(request.getEmailAddress());
		user.setPassword(SecurityConfig.getPasswordEncoder().encode(request.getPassword1()));
		user.setEnabled(Boolean.TRUE);
		user.setCreatedTimestamp(LocalDateTime.now());
		
		userRepo.save(user);
		
		String message = "Welcome to Nexus! Your account has been successfully created. Please log in with the credentials you have specified. "
				+ "If you can't remember them, no worries! You can reset your password.";
		
		EmailUtility.sendEmail(request.getEmailAddress(), "Nexus: Welcome!", message);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> updateUserBasic(BasicUserUpdateRequest request) {
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		User user = userOpt.get();
		
		user.setDisplayName(request.getDisplayName());
		user.setEmailAddress(request.getEmailAddress());
		
		userRepo.save(user);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@Transactional
	@Modifying
	public ResponseEntity<Object> updateUserAdmin(AdminUserUpdateRequest request) {
		Optional<User> userOpt = userRepo.findById(request.getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Optional<Role> roleOpt = roleRepo.findById(request.getRoleId());
		
		if(roleOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ROLE_NOT_FOUND), HttpStatus.BAD_REQUEST);
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