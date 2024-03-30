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
import com.cps630.nexus.entity.StudyGroup;
import com.cps630.nexus.entity.StudyGroupMember;
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.StudyGroupMemberRepository;
import com.cps630.nexus.repository.StudyGroupRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.StudyGroupCreateRequest;
import com.cps630.nexus.request.StudyGroupGetRequest;
import com.cps630.nexus.request.StudyGroupJoinRequest;
import com.cps630.nexus.request.StudyGroupLeaveRequest;
import com.cps630.nexus.request.StudyGroupUpdateRequest;
import com.cps630.nexus.response.StudyGroupFullResponse;
import com.cps630.nexus.response.StudyGroupFullResponse.AttendeeResponse;
import com.cps630.nexus.response.StudyGroupResponse;
import com.cps630.nexus.util.ConstantUtil;
import com.cps630.nexus.util.Utility;

import jakarta.transaction.Transactional;

@Service
public class StudyGroupService {
	@Autowired
	private StudyGroupRepository studyGroupRepo;
	
	@Autowired
	private StudyGroupMemberRepository studyGroupMemberRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Transactional
	@Modifying
	public ResponseEntity<Object> createStudyGroup(StudyGroupCreateRequest request) {
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		StudyGroup studyGroup = new StudyGroup();
		studyGroup.setTimestamp(request.getTimestamp());
		studyGroup.setRoom(request.getRoom());
		studyGroup.setCourseName(request.getCourseName());
		studyGroup.setSeatLimit(request.getSeatLimit());
		studyGroup.setUser(userOpt.get());
		
		studyGroupRepo.save(studyGroup);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> updateStudyGroup(StudyGroupUpdateRequest request) {
		Optional<StudyGroup> studyGroupOpt = studyGroupRepo.findById(request.getStudyGroupId());
		
		if(studyGroupOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.STUDY_GROUP_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		StudyGroup studyGroup = studyGroupOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), studyGroup.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
		
		studyGroup.setTimestamp(request.getTimestamp());
		studyGroup.setRoom(request.getRoom());
		studyGroup.setCourseName(request.getCourseName());
		studyGroup.setSeatLimit(request.getSeatLimit());
		
		studyGroupRepo.save(studyGroup);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> joinStudyGroup(StudyGroupJoinRequest request) {
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		User user = userOpt.get();
		
		
		Optional<StudyGroup> studyGroupOpt = studyGroupRepo.findById(request.getStudyGroupId());
		
		if(studyGroupOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.STUDY_GROUP_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		StudyGroup studyGroup = studyGroupOpt.get();
		
		if(Objects.equals(Utility.getAuthenticatedUser().getUserId(), studyGroup.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.STUDY_GROUP_HOST, "You are the host of this group"), HttpStatus.BAD_REQUEST);
		}
		
		Optional<StudyGroupMember> studyGroupMemberOpt = studyGroupMemberRepo.getStudyGroupMember(studyGroup.getStudyGroupId(), user.getUserId());
		
		if(studyGroupMemberOpt.isPresent()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ALREADY_IN_STUDY_GROUP), HttpStatus.BAD_REQUEST);
		}
		
		int takenSeats = studyGroupMemberRepo.getStudyGroupMemberList(request.getStudyGroupId()).size();
		
		if(takenSeats == studyGroup.getSeatLimit()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.MAX_STUDY_GROUP_SEATS_REACHED), HttpStatus.BAD_REQUEST);
		}
		
		
		StudyGroupMember studyGroupMember = new StudyGroupMember();
		studyGroupMember.setStudyGroup(studyGroup);
		studyGroupMember.setUser(userOpt.get());
		
		studyGroupMemberRepo.save(studyGroupMember);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> leaveStudyGroup(StudyGroupLeaveRequest request) {
		Optional<StudyGroup> studyGroupOpt = studyGroupRepo.findById(request.getStudyGroupId());
		
		if(studyGroupOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.STUDY_GROUP_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		StudyGroup studyGroup = studyGroupOpt.get();
		
		Optional<StudyGroupMember> studyGroupMemberOpt = studyGroupMemberRepo.getStudyGroupMember(studyGroup.getStudyGroupId(), Utility.getAuthenticatedUser().getUserId());
		
		if(studyGroupMemberOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.NOT_IN_STUDY_GROUP), HttpStatus.BAD_REQUEST);
		}
		
		studyGroupMemberRepo.delete(studyGroupMemberOpt.get());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> getStudyGroupList() {
		List<StudyGroup> studyGroupList = studyGroupRepo.findAll();
		
		List<StudyGroupResponse> responseList = new ArrayList<>();
		
		for(StudyGroup studyGroup : studyGroupList) {
			StudyGroupResponse responseObj = new StudyGroupResponse();
			
			responseObj.setStudyGroupId(studyGroup.getStudyGroupId());
			responseObj.setTimestamp(studyGroup.getTimestamp());
			responseObj.setRoom(studyGroup.getRoom());
			responseObj.setCourseName(studyGroup.getCourseName());
			responseObj.setSeatLimit(studyGroup.getSeatLimit());
			responseObj.setDisplayName(studyGroup.getUser().getDisplayName());
			responseObj.setEmailAddress(studyGroup.getUser().getEmailAddress());
			
			responseList.add(responseObj);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<Object> getStudyGroup(StudyGroupGetRequest request) {
		Optional<StudyGroup> studyGroupOpt = studyGroupRepo.findById(request.getStudyGroupId());
		
		if(studyGroupOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.STUDY_GROUP_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		StudyGroup studyGroup = studyGroupOpt.get();
		
		StudyGroupFullResponse responseObj = new StudyGroupFullResponse();
		
		responseObj.setStudyGroupId(studyGroup.getStudyGroupId());
		responseObj.setTimestamp(studyGroup.getTimestamp());
		responseObj.setRoom(studyGroup.getRoom());
		responseObj.setCourseName(studyGroup.getCourseName());
		responseObj.setSeatLimit(studyGroup.getSeatLimit());
		responseObj.setDisplayName(studyGroup.getUser().getDisplayName());
		responseObj.setEmailAddress(studyGroup.getUser().getEmailAddress());
	
		List<AttendeeResponse> attendeeList = new ArrayList<>();
		List<StudyGroupMember> studyGroupMemberList = studyGroupMemberRepo.getStudyGroupMemberList(request.getStudyGroupId());
		
		if(Objects.equals(Utility.getAuthenticatedUser().getUserId(), studyGroup.getUser().getUserId())) {
			for(StudyGroupMember studyGroupMember : studyGroupMemberList) {
				User user = studyGroupMember.getUser();
				
				attendeeList.add(new AttendeeResponse(user.getDisplayName(), user.getEmailAddress()));
			}
		}
		
		else {
			for(StudyGroupMember studyGroupMember : studyGroupMemberList) {
				User user = studyGroupMember.getUser();
				
				attendeeList.add(new AttendeeResponse(user.getDisplayName(), Utility.maskEmail(user.getEmailAddress())));
			}
		}
		
		responseObj.setAttendeeList(attendeeList);
		
		return new ResponseEntity<>(responseObj, HttpStatus.OK);
	}
}