package com.cps630.nexus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cps630.nexus.request.AdvertisementCreateRequest;
import com.cps630.nexus.service.AdvertisementService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class AdvertisementController {
	@Autowired
	private AdvertisementService service;
	
	@PostMapping("/internal/basic/advertisement/create")
	public ResponseEntity<Object> createAdvertisement(@RequestPart("body") @Valid AdvertisementCreateRequest request, @RequestPart("images") MultipartFile[] images) {
		return service.createAdvertisement(request, images);
	}
	
	@PostMapping("/internal/basic/advertisement/list/get") // list ads by category
	public ResponseEntity<Object> listAds() {
		return service.listAds();
	}
	
	// edit ads (not images. images will be to be deleted and reuploaded as necessary)
	
	// admins can disable ads
}