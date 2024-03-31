package com.cps630.nexus.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cps630.nexus.entity.Discussion;
import com.cps630.nexus.entity.DiscussionReply;
import com.cps630.nexus.entity.ErrorInfo;
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.DiscussionReplyRepository;
import com.cps630.nexus.repository.DiscussionRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.DiscussionCreateRequest;
import com.cps630.nexus.request.DiscussionGetRequest;
import com.cps630.nexus.request.DiscussionReplyCreateRequest;
import com.cps630.nexus.request.DiscussionReplyUpdateRequest;
import com.cps630.nexus.request.DiscussionUpdateRequest;
import com.cps630.nexus.response.DiscussionFullResponse;
import com.cps630.nexus.response.DiscussionFullResponse.ReplyResponse;
import com.cps630.nexus.response.DiscussionResponse;
import com.cps630.nexus.util.ConstantUtil;
import com.cps630.nexus.util.Utility;

import jakarta.transaction.Transactional;

@Service
public class DiscussionService {
	@Autowired
	private DiscussionRepository discussionRepo;
	
	@Autowired
	private DiscussionReplyRepository discussionReplyRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Transactional
	@Modifying
	public ResponseEntity<Object> createDiscussion(DiscussionCreateRequest request) {		
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Discussion discussion = new Discussion();
		discussion.setDescription(request.getDescription());
		discussion.setCreatedTimestamp(LocalDateTime.now());
		discussion.setUpdatedTimestamp(LocalDateTime.now());
		discussion.setUser(userOpt.get());
		
		discussionRepo.save(discussion);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> updateDiscussionBasic(DiscussionUpdateRequest request) {
		Optional<Discussion> discussionOpt = discussionRepo.findById(request.getDiscussionId());
		
		if(discussionOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TEXTBOOK_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Discussion discussion = discussionOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), discussion.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
		
		return updateDiscussion(request, discussion);
	}
	
	public ResponseEntity<Object> updateDiscussionAdmin(DiscussionUpdateRequest request) {
		Optional<Discussion> discussionOpt = discussionRepo.findById(request.getDiscussionId());
		
		if(discussionOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TEXTBOOK_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		return updateDiscussion(request, discussionOpt.get());
	}
	
	@Transactional
	@Modifying
	private ResponseEntity<Object> updateDiscussion(DiscussionUpdateRequest request, Discussion discussion) {
		discussion.setDescription(request.getDescription());
		discussion.setUpdatedTimestamp(LocalDateTime.now());
		
		discussionRepo.save(discussion);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> createDiscussionReply(DiscussionReplyCreateRequest request) {
		Optional<Discussion> discussionOpt = discussionRepo.findById(request.getDiscussionId());
		
		if(discussionOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TEXTBOOK_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		DiscussionReply discussionReply = new DiscussionReply();
		discussionReply.setDiscussion(discussionOpt.get());
		discussionReply.setReply(request.getReply());
		discussionReply.setCreatedTimestamp(LocalDateTime.now());
		discussionReply.setUpdatedTimestamp(LocalDateTime.now());
		discussionReply.setUser(userOpt.get());
		
		discussionReplyRepo.save(discussionReply);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> updateDiscussionReplyBasic(DiscussionReplyUpdateRequest request) {
		Optional<DiscussionReply> discussionReplyOpt = discussionReplyRepo.findById(request.getDiscussionReplyId());
		
		if(discussionReplyOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.DISCUSSION_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		DiscussionReply discussionReply = discussionReplyOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), discussionReply.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
		
		return updateDiscussionReply(request, discussionReply);
	}
	
	public ResponseEntity<Object> updateDiscussionReplyAdmin(DiscussionReplyUpdateRequest request) {
		Optional<DiscussionReply> discussionReplyOpt = discussionReplyRepo.findById(request.getDiscussionReplyId());
		
		if(discussionReplyOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.DISCUSSION_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		return updateDiscussionReply(request, discussionReplyOpt.get());
	}
	
	@Transactional
	@Modifying
	private ResponseEntity<Object> updateDiscussionReply(DiscussionReplyUpdateRequest request, DiscussionReply discussionReply) {
		discussionReply.setReply(request.getReply());
		discussionReply.setUpdatedTimestamp(LocalDateTime.now());
		
		discussionReplyRepo.save(discussionReply);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> getDiscussionList() {
		List<Discussion> discussionList = discussionRepo.findAll();
		
		List<DiscussionResponse> responseList = new ArrayList<>();
		
		for(Discussion discussion : discussionList) {
			DiscussionResponse responseObj = new DiscussionResponse();
			responseObj.setDiscussionid(discussion.getDiscussionId());
			responseObj.setDescription(discussion.getDescription());
			responseObj.setCreatedTimestamp(discussion.getCreatedTimestamp());
			responseObj.setUpdatedTimestamp(discussion.getUpdatedTimestamp());
			responseObj.setDisplayName(discussion.getUser().getDisplayName());
			
			responseList.add(responseObj);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<Object> getDiscussion(DiscussionGetRequest request) {
		Optional<Discussion> discussionOpt = discussionRepo.findById(request.getDiscussionId());
		
		if(discussionOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.DISCUSSION_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Discussion discussion = discussionOpt.get();
		
		DiscussionFullResponse responseObj = new DiscussionFullResponse();
		responseObj.setDiscussionid(discussion.getDiscussionId());
		responseObj.setDescription(discussion.getDescription());
		responseObj.setCreatedTimestamp(discussion.getCreatedTimestamp());
		responseObj.setUpdatedTimestamp(discussion.getUpdatedTimestamp());
		responseObj.setDisplayName(discussion.getUser().getDisplayName());
		
		List<ReplyResponse> replyList = new ArrayList<>();
		List<DiscussionReply> discussionReplyList = discussionReplyRepo.getDiscussionReplyList(request.getDiscussionId());
		
		for(DiscussionReply discussionReply : discussionReplyList) {
			replyList.add(new ReplyResponse(discussionReply.getDiscussionReplyId(), discussionReply.getReply(), discussionReply.getCreatedTimestamp(),
					discussionReply.getUpdatedTimestamp(), discussionReply.getUser().getDisplayName()));
		}
		
		responseObj.setReplyList(replyList);
		
		return new ResponseEntity<>(responseObj, HttpStatus.OK);
	}
}