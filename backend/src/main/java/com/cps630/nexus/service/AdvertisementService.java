package com.cps630.nexus.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.cps630.nexus.entity.Advertisement;
import com.cps630.nexus.entity.AdvertisementImage;
import com.cps630.nexus.entity.Category;
import com.cps630.nexus.entity.ErrorInfo;
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.AdvertisementImageRepository;
import com.cps630.nexus.repository.AdvertisementRepository;
import com.cps630.nexus.repository.CategoryRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.AdvertisementByCategoryGetRequest;
import com.cps630.nexus.request.AdvertisementCreateRequest;
import com.cps630.nexus.request.AdvertisementGetRequest;
import com.cps630.nexus.request.AdvertisementImageAddRequest;
import com.cps630.nexus.request.AdvertisementImageDeleteRequest;
import com.cps630.nexus.request.AdvertisementUpdateRequest;
import com.cps630.nexus.request.ContactAdvertisementRequest;
import com.cps630.nexus.response.AdvertisementFullResponse;
import com.cps630.nexus.response.AdvertisementFullResponse.AdvertisementImageResponse;
import com.cps630.nexus.response.AdvertisementResponse;
import com.cps630.nexus.util.ConstantUtil;
import com.cps630.nexus.util.EmailUtility;
import com.cps630.nexus.util.Utility;

import jakarta.transaction.Transactional;

@Service
public class AdvertisementService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CategoryRepository catRepo;
	
	@Autowired
	private AdvertisementRepository adRepo;
	
	@Autowired
	private AdvertisementImageRepository adImageRepo;
	
	private Set<String> validImageTypes = Stream.of("png", "jpg", "jpeg", "gif").collect(Collectors.toSet());
	
	@Transactional
	@Modifying
	public ResponseEntity<Object> createAdvertisement(AdvertisementCreateRequest request, MultipartFile[] images) {
		try {
			Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
			
			if(userOpt.isEmpty()) {
				return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
			}
			
			Optional<Category> categoryOpt = catRepo.findById(request.getCategoryId());
			
			if(categoryOpt.isEmpty()) {
				return new ResponseEntity<>(new ErrorInfo(ConstantUtil.CATEGORY_NOT_FOUND), HttpStatus.BAD_REQUEST);
			}
			
			// Validation loop
			for(MultipartFile image : images) {
				if(images.length > 10) {
					return new ResponseEntity<>(new ErrorInfo(ConstantUtil.IMAGE_LIMIT_EXCEEDED, "10 images maximum"), HttpStatus.BAD_REQUEST);
				}
				
				if(image.getSize() > 1024 * 1024 * 5) { // 5 MB
					ErrorInfo errorInfo = new ErrorInfo();
					
					errorInfo.setMessage(ConstantUtil.INVALID_FILE_SIZE);
					errorInfo.setDetail("File: " + image.getOriginalFilename() + " exceeds 5 MB file limit");
					
					return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
				}
				
				if(!validImageTypes.contains(StringUtils.getFilenameExtension(image.getOriginalFilename()))) {
					ErrorInfo errorInfo = new ErrorInfo();
					
					errorInfo.setMessage(ConstantUtil.INVALID_IMAGE_TYPE);
					errorInfo.setDetail("Invalid file: " + image.getOriginalFilename() + ". png, jpeg, jpg, gif are accepted");
					
					return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
				}
			}
			
			Advertisement ad = new Advertisement();
			ad.setUser(userOpt.get());
			ad.setTitle(request.getTitle());
			ad.setDescription(request.getDescription());
			ad.setCreatedTimestamp(LocalDateTime.now());
			ad.setCategory(categoryOpt.get());
			ad.setPrice(request.getPrice());
			ad.setLocation(request.getLocation());
			ad.setEnabled(Boolean.TRUE);
			
			ad = adRepo.save(ad);
			
			// Persistence loop
			for(MultipartFile image : images) {
				AdvertisementImage adImage = new AdvertisementImage();
				
				adImage.setAdvertisement(ad);
				adImage.setMimeType(image.getContentType());
				adImage.setData(image.getBytes());
				
				adImageRepo.save(adImage);
			}
			
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		catch(Exception ex) {
			return new ResponseEntity<>(new ErrorInfo(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Object> updateAdvertisementBasic(AdvertisementUpdateRequest request) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Advertisement ad = adOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), ad.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
		
		return updateAdvertisement(request, ad);
	}

	public ResponseEntity<Object> updateAdvertisementAdmin(AdvertisementUpdateRequest request) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		return updateAdvertisement(request, adOpt.get());
	}
	
	@Transactional
	@Modifying
	private ResponseEntity<Object> updateAdvertisement(AdvertisementUpdateRequest request, Advertisement ad) {
		Optional<Category> categoryOpt = catRepo.findById(request.getCategoryId());
		
		if(categoryOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.CATEGORY_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		ad.setTitle(request.getTitle());
		ad.setDescription(request.getDescription());
		ad.setCategory(categoryOpt.get());
		ad.setPrice(request.getPrice());
		ad.setLocation(request.getLocation());
		ad.setEnabled(request.getEnabled());
		
		adRepo.save(ad);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Transactional
	@Modifying
	public ResponseEntity<Object> addAdvertisementImage(AdvertisementImageAddRequest request, MultipartFile[] images) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Advertisement ad = adOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), ad.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
	
		try {
			List<AdvertisementImage> adImageList = adImageRepo.findAllByAdvertisementId(request.getAdvertisementId());
			
			if(adImageList.size() + images.length > 10) {
				ErrorInfo errorInfo = new ErrorInfo();
				
				errorInfo.setMessage(ConstantUtil.IMAGE_LIMIT_EXCEEDED);
				errorInfo.setDetail("Advertisement has " + adImageList.size() + "image(s). Only " + (10 - adImageList.size()) + " additional image(s) are allowed");
				
				return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
			}
			
			// Validation loop
			for(MultipartFile image : images) {				
				if(image.getSize() > 1024 * 1024 * 5) { // 5 MB
					ErrorInfo errorInfo = new ErrorInfo();
					
					errorInfo.setMessage(ConstantUtil.INVALID_FILE_SIZE);
					errorInfo.setDetail("File: " + image.getOriginalFilename() + " exceeds 5 MB file limit");
					
					return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
				}
				
				if(!validImageTypes.contains(StringUtils.getFilenameExtension(image.getOriginalFilename()))) {
					ErrorInfo errorInfo = new ErrorInfo();
					
					errorInfo.setMessage(ConstantUtil.INVALID_IMAGE_TYPE);
					errorInfo.setDetail("Invalid file: " + image.getOriginalFilename() + ". png, jpeg, jpg, gif are accepted");
					
					return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
				}
			}
			
			// Persistence loop
			for(MultipartFile image : images) {
				AdvertisementImage adImage = new AdvertisementImage();
				
				adImage.setAdvertisement(ad);
				adImage.setMimeType(image.getContentType());
				adImage.setData(image.getBytes());
				
				adImageRepo.save(adImage);
			}
			
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		catch(Exception ex) {
			return new ResponseEntity<>(new ErrorInfo(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Object> deleteAdvertisementImageBasic(AdvertisementImageDeleteRequest request) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Advertisement ad = adOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), ad.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER), HttpStatus.UNAUTHORIZED);
		}
		
		return deleteAdvertisementImage(request, ad);
	}

	public ResponseEntity<Object> deleteAdvertisementImageAdmin(AdvertisementImageDeleteRequest request) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		return deleteAdvertisementImage(request, adOpt.get());
	}
	
	@Transactional
	@Modifying
	private ResponseEntity<Object> deleteAdvertisementImage(AdvertisementImageDeleteRequest request, Advertisement ad) {
		Optional<AdvertisementImage> adImageOpt = adImageRepo.findById(request.getAdvertisementImageId());
		
		if(adImageOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_IMAGE_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		adImageRepo.delete(adImageOpt.get());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> getAdListByCategoryBasic(AdvertisementByCategoryGetRequest request) {
		Optional<Category> categoryOpt = catRepo.findById(request.getCategoryId());
		
		if(categoryOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.CATEGORY_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		List<AdvertisementResponse> responseList = new ArrayList<>();
		
		List<Advertisement> adList = adRepo.getAllByCategoryIdEnabled(request.getCategoryId());
		
		for(Advertisement ad : adList) {
			AdvertisementResponse responseObj = new AdvertisementResponse();
			
			responseObj.setAdvertisementId(ad.getAdvertisementId());
			responseObj.setDisplayName(ad.getUser().getDisplayName());
			responseObj.setTitle(ad.getTitle());
			responseObj.setDescription(ad.getDescription());
			responseObj.setCreatedTimestamp(ad.getCreatedTimestamp());
			responseObj.setCategory(ad.getCategory());
			responseObj.setPrice(ad.getPrice());
			responseObj.setLocation(ad.getLocation());
			responseObj.setEnabled(ad.getEnabled());
			
			Optional<AdvertisementImage> posterImageOpt = adImageRepo.getPosterImageByAdvertisementId(ad.getAdvertisementId());
			
			if(posterImageOpt.isPresent()) {
				AdvertisementImage posterImage = posterImageOpt.get();
				
				responseObj.setPosterMimeType(posterImage.getMimeType());
				responseObj.setPoster(posterImage.getData());
			}
			
			responseList.add(responseObj);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
	
	public ResponseEntity<Object> getAdListByCategoryAdmin(AdvertisementByCategoryGetRequest request) {
		Optional<Category> categoryOpt = catRepo.findById(request.getCategoryId());
		
		if(categoryOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.CATEGORY_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		List<AdvertisementResponse> responseList = new ArrayList<>();
		
		List<Advertisement> adList = adRepo.getAllByCategoryId(request.getCategoryId());
		
		for(Advertisement ad : adList) {
			AdvertisementResponse responseObj = new AdvertisementResponse();
			
			responseObj.setAdvertisementId(ad.getAdvertisementId());
			responseObj.setDisplayName(ad.getUser().getDisplayName());
			responseObj.setTitle(ad.getTitle());
			responseObj.setDescription(ad.getDescription());
			responseObj.setCreatedTimestamp(ad.getCreatedTimestamp());
			responseObj.setCategory(ad.getCategory());
			responseObj.setPrice(ad.getPrice());
			responseObj.setLocation(ad.getLocation());
			responseObj.setEnabled(ad.getEnabled());
			
			Optional<AdvertisementImage> posterImageOpt = adImageRepo.getPosterImageByAdvertisementId(ad.getAdvertisementId());
			
			if(posterImageOpt.isPresent()) {
				AdvertisementImage posterImage = posterImageOpt.get();
				
				responseObj.setPosterMimeType(posterImage.getMimeType());
				responseObj.setPoster(posterImage.getData());
			}
			
			responseList.add(responseObj);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}
	
	public ResponseEntity<Object> getAuthenticatedUserAdList() {
		List<AdvertisementResponse> responseList = new ArrayList<>();
		
		List<Advertisement> adList = adRepo.getAllByUserId(Utility.getAuthenticatedUser().getUserId());
		
		for(Advertisement ad : adList) {
			AdvertisementResponse responseObj = new AdvertisementResponse();
			
			responseObj.setAdvertisementId(ad.getAdvertisementId());
			responseObj.setDisplayName(ad.getUser().getDisplayName());
			responseObj.setTitle(ad.getTitle());
			responseObj.setDescription(ad.getDescription());
			responseObj.setCreatedTimestamp(ad.getCreatedTimestamp());
			responseObj.setCategory(ad.getCategory());
			responseObj.setPrice(ad.getPrice());
			responseObj.setLocation(ad.getLocation());
			responseObj.setEnabled(ad.getEnabled());
			
			Optional<AdvertisementImage> posterImageOpt = adImageRepo.getPosterImageByAdvertisementId(ad.getAdvertisementId());
			
			if(posterImageOpt.isPresent()) {
				AdvertisementImage posterImage = posterImageOpt.get();
				
				responseObj.setPosterMimeType(posterImage.getMimeType());
				responseObj.setPoster(posterImage.getData());
			}
			
			responseList.add(responseObj);
		}
		
		return new ResponseEntity<>(responseList, HttpStatus.OK);
	}

	public ResponseEntity<Object> getAdvertisementBasic(AdvertisementGetRequest request) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Advertisement ad = adOpt.get();
		
		if(!Objects.equals(Utility.getAuthenticatedUser().getUserId(), ad.getUser().getUserId()) && Boolean.FALSE.equals(ad.getEnabled())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_DISABLED), HttpStatus.UNAUTHORIZED);
		}
		
		return getAdvertisement(ad);
	}

	public ResponseEntity<Object> getAdvertisementAdmin(AdvertisementGetRequest request) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		return getAdvertisement(adOpt.get());
	}
	
	private ResponseEntity<Object> getAdvertisement(Advertisement ad) {
		AdvertisementFullResponse response = new AdvertisementFullResponse();
		
		response.setAdvertisementId(ad.getAdvertisementId());
		response.setDisplayName(ad.getUser().getDisplayName());
		response.setTitle(ad.getTitle());
		response.setDescription(ad.getDescription());
		response.setCreatedTimestamp(ad.getCreatedTimestamp());
		response.setCategory(ad.getCategory());
		response.setPrice(ad.getPrice());
		response.setLocation(ad.getLocation());
		response.setEnabled(ad.getEnabled());
		
		List<AdvertisementImage> adImageList = adImageRepo.findAllByAdvertisementId(ad.getAdvertisementId());
		List<AdvertisementImageResponse> imageList = new ArrayList<>();
		
		for(AdvertisementImage adImage : adImageList) {
			imageList.add(new AdvertisementImageResponse(adImage.getAdvertisementImageId(), adImage.getMimeType(), adImage.getData()));
		}
		
		response.setImageList(imageList);
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	public ResponseEntity<Object> contactAdvertisement(ContactAdvertisementRequest request) {
		Optional<Advertisement> adOpt = adRepo.findById(request.getAdvertisementId());
		
		if(adOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.ADVERTISEMENT_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		Advertisement ad = adOpt.get();
		
		if(Objects.equals(Utility.getAuthenticatedUser().getUserId(), ad.getUser().getUserId())) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.INVALID_USER, "This is your own advertisement"), HttpStatus.BAD_REQUEST);
		}
		
		Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
		
		if(userOpt.isEmpty()) {
			return new ResponseEntity<>(new ErrorInfo(ConstantUtil.USER_NOT_FOUND), HttpStatus.BAD_REQUEST);
		}
		
		User user = userOpt.get();
		
		String to = ad.getUser().getEmailAddress();
		String replyTo = user.getEmailAddress();
		String title = "Nexus: " + ad.getTitle();
		String message = "A Nexus member [" + user.getEmailAddress() + "] is attempting to contact you regarding an advertisement you posted:\n\n" + request.getMessage();
		
		EmailUtility.sendEmail(to, replyTo, title, message);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
}