package com.cps630.nexus.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cps630.nexus.entity.ErrorInfo;
import com.cps630.nexus.entity.TutorLevel;
import com.cps630.nexus.entity.TutorSession;
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.TutorLevelRepository;
import com.cps630.nexus.repository.TutorSessionRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.TutorSessionCreateRequest;
import com.cps630.nexus.request.TutorSessionUpdateRequest;
import com.cps630.nexus.response.TutorSessionResponse;
import com.cps630.nexus.util.ConstantUtil;
import com.cps630.nexus.util.Utility;

import jakarta.transaction.Transactional;

@Service
public class TutorSessionService {
	@Autowired
	private TutorLevelRepository tutorLevelRepo;
	
	@Autowired
	private TutorSessionRepository tutorSessionRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Transactional
	@Modifying
	public ResponseEntity<Object> createTutorSession(TutorSessionCreateRequest request) {
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Optional<TutorLevel> tutorLevelOpt = tutorLevelRepo.findById(request.getTutorLevelId());
		
		if(tutorLevelOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TUTOR_LEVEL_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		TutorSession tutorSession = new TutorSession();
		tutorSession.setCourseName(request.getCourseName());
		tutorSession.setEnabled(Boolean.TRUE);
		tutorSession.setTutorLevel(tutorLevelOpt.get());
		tutorSession.setUser(userOpt.get());
		
		tutorSessionRepo.save(tutorSession);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> updateTutorSession(TutorSessionUpdateRequest request) {
		Optional<TutorSession> tutorSessionOpt = tutorSessionRepo.findById(request.getTutorSessionId());
		
		if(tutorSessionOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TUTOR_SESSION_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		TutorSession tutorSession = tutorSessionOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), tutorSession.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
		
		Optional<TutorLevel> tutorLevelOpt = tutorLevelRepo.findById(request.getTutorLevelId());
		
		if(tutorLevelOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TUTOR_LEVEL_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		tutorSession.setCourseName(request.getCourseName());
		tutorSession.setEnabled(request.getEnabled());
		tutorSession.setTutorLevel(tutorLevelOpt.get());
		
		tutorSessionRepo.save(tutorSession);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> getTutorSessionList() {
		List<TutorSession> tutorSessionList = tutorSessionRepo.getEnabledTutorSessionList();
		
		List<TutorSessionResponse> responseList = new ArrayList<>();
		
		for(TutorSession tutorSession : tutorSessionList) {
			TutorSessionResponse responseObj = new TutorSessionResponse();
			responseObj.setTutorSessionId(tutorSession.getTutorSessionId());
			responseObj.setCourseName(tutorSession.getCourseName());
			responseObj.setTutorLevel(tutorSession.getTutorLevel());
			responseObj.setDisplayName(tutorSession.getUser().getDisplayName());
			responseObj.setEmailAddress(tutorSession.getUser().getEmailAddress());
			
			responseList.add(responseObj);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
}