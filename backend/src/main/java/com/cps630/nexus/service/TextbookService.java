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
import com.cps630.nexus.entity.Textbook;
import com.cps630.nexus.entity.TextbookGenre;
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.TextbookGenreRepository;
import com.cps630.nexus.repository.TextbookRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.TextbookCreateRequest;
import com.cps630.nexus.request.TextbookUpdateRequest;
import com.cps630.nexus.response.TextbookResponse;
import com.cps630.nexus.util.ConstantUtil;
import com.cps630.nexus.util.Utility;

import jakarta.transaction.Transactional;

@Service
public class TextbookService {
	@Autowired
	private TextbookRepository textbookRepo;
	
	@Autowired
	private TextbookGenreRepository textbookGenreRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Transactional
	@Modifying
	public ResponseEntity<Object> createTextbook(TextbookCreateRequest request) {
		Optional<TextbookGenre> textbookGenreOpt = textbookGenreRepo.findById(request.getGenreId());
		
		if(textbookGenreOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TEXTBOOK_GENRE_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Textbook textbook = new Textbook();
		textbook.setName(request.getName());
		textbook.setEnabled(Boolean.TRUE);
		textbook.setLocation(request.getLocation());
		textbook.setUser(userOpt.get());
		textbook.setGenre(textbookGenreOpt.get());
		
		textbookRepo.save(textbook);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> updateTextbook(TextbookUpdateRequest request) {
		Optional<TextbookGenre> textbookGenreOpt = textbookGenreRepo.findById(request.getGenreId());
		
		if(textbookGenreOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TEXTBOOK_GENRE_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Optional<Textbook> textbookOpt = textbookRepo.findById(request.getTextbookId());
		
		if(textbookOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.TEXTBOOK_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Textbook textbook = textbookOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), textbook.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
		
		textbook.setName(request.getName());
		textbook.setEnabled(request.getEnabled());
		textbook.setLocation(request.getLocation());
		textbook.setGenre(textbookGenreOpt.get());
		
		textbookRepo.save(textbook);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public ResponseEntity<Object> getTextbookList() {
		List<Textbook> textbookList = textbookRepo.getEnabledTextbookList();
		
		List<TextbookResponse> responseList = new ArrayList<>();
		
		for(Textbook textbook : textbookList) {
			TextbookResponse responseObj = new TextbookResponse();
			responseObj.setTextbookId(textbook.getTextbookId());
			responseObj.setName(textbook.getName());
			responseObj.setLocation(textbook.getLocation());
			responseObj.setDisplayName(textbook.getUser().getDisplayName());
			responseObj.setEmailAddress(textbook.getUser().getEmailAddress());
			responseObj.setGenre(textbook.getGenre());
			
			responseList.add(responseObj);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
}