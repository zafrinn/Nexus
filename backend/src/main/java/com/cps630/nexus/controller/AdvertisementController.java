package com.cps630.nexus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cps630.nexus.request.AdvertisementByCategoryGetRequest;
import com.cps630.nexus.request.AdvertisementCreateRequest;
import com.cps630.nexus.request.AdvertisementGetRequest;
import com.cps630.nexus.request.AdvertisementImageAddRequest;
import com.cps630.nexus.request.AdvertisementImageDeleteRequest;
import com.cps630.nexus.request.AdvertisementUpdateRequest;
import com.cps630.nexus.request.ContactAdvertisementRequest;
import com.cps630.nexus.service.AdvertisementService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class AdvertisementController {
	@Autowired
	private AdvertisementService service;
	
	/**
	 * Endpoint to create an advertisement
	 * @param request
	 * @param images
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/create")
	public ResponseEntity<Object> createAdvertisement(@RequestPart("body") @Valid AdvertisementCreateRequest request, @RequestPart("images") MultipartFile[] images) {
		return service.createAdvertisement(request, images);
	}
	
	/**
	 * Endpoint to update an advertisement
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/update")
	public ResponseEntity<Object> updateAdvertisementBasic(@RequestBody @Valid AdvertisementUpdateRequest request) {
		return service.updateAdvertisementBasic(request);
	}
	
	/**
	 * Endpoint to update an advertisement. Only accessible by administrators
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/admin/advertisement/update")
	public ResponseEntity<Object> updateAdvertisementAdmin(@RequestBody @Valid AdvertisementUpdateRequest request) {
		return service.updateAdvertisementAdmin(request);
	}
	
	/**
	 * Endpoint to add an image to an advertisement
	 * @param request
	 * @param images
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/image/add")
	public ResponseEntity<Object> addAdvertisementImageBasic(@RequestPart("body") @Valid AdvertisementImageAddRequest request, @RequestPart("images") MultipartFile[] images) {
		return service.addAdvertisementImage(request, images);
	}
	
	/**
	 * Endpoint to delete an image from an advertisement
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/image/delete")
	public ResponseEntity<Object> deleteAdvertisementImageBasic(@RequestBody @Valid AdvertisementImageDeleteRequest request) {
		return service.deleteAdvertisementImageBasic(request);
	}
	
	/**
	 * Endpoint to delete an image from an advertisement. Only accessible by administrators
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/admin/advertisement/image/delete")
	public ResponseEntity<Object> deleteAdvertisementImageAdmin(@RequestBody @Valid AdvertisementImageDeleteRequest request) {
		return service.deleteAdvertisementImageAdmin(request);
	}
	
	/**
	 * Endpoint to get a list of active advertisements
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/list/get")
	public ResponseEntity<Object> getAdListByCategoryBasic(@RequestBody @Valid AdvertisementByCategoryGetRequest request) {
		return service.getAdListByCategoryBasic(request);
	}
	
	/**
	 * Endpoint to get a list of all advertisements. Only accessible by administrators
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/admin/advertisement/list/get")
	public ResponseEntity<Object> getAdListByCategoryAdmin(@RequestBody @Valid AdvertisementByCategoryGetRequest request) {
		return service.getAdListByCategoryAdmin(request);
	}
	
	/**
	 * Endpoint to get a list of advertisements created by the authenticated user
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/list/current/get")
	public ResponseEntity<Object> getAuthenticatedUserAdList() {
		return service.getAuthenticatedUserAdList();
	}
	
	/**
	 * Endpoint to get a specific advertisement
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/get")
	public ResponseEntity<Object> getAdvertisementBasic(@RequestBody @Valid AdvertisementGetRequest request) {
		return service.getAdvertisementBasic(request);
	}
	
	/**
	 * Endpoint to get a specific advertisement. Only accessible by administrators
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/admin/advertisement/get")
	public ResponseEntity<Object> getAdvertisementAdmin(@RequestBody @Valid AdvertisementGetRequest request) {
		return service.getAdvertisementAdmin(request);
	}
	
	/**
	 * Endpoint to contact the poster of an advertisement
	 * @param request
	 * @return
	 */
	@PostMapping("/internal/basic/advertisement/contact")
	public ResponseEntity<Object> contactAdvertisement(@RequestBody @Valid ContactAdvertisementRequest request) {
		return service.contactAdvertisement(request);
	}
}