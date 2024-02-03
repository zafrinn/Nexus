package com.cps630.nexus.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
import com.cps630.nexus.entity.User;
import com.cps630.nexus.repository.AdvertisementImageRepository;
import com.cps630.nexus.repository.AdvertisementRepository;
import com.cps630.nexus.repository.CategoryRepository;
import com.cps630.nexus.repository.UserRepository;
import com.cps630.nexus.request.AdvertisementCreateRequest;
import com.cps630.nexus.response.AdvertisementListResponse;
import com.cps630.nexus.util.ConstantUtil;
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
	
	@Transactional
	@Modifying
	public ResponseEntity<Object> createAdvertisement(AdvertisementCreateRequest request, MultipartFile[] images) {
		try {
			Optional<User> userOpt = userRepo.findById(Utility.getAuthenticatedUser().getUserId());
			
			if(userOpt.isEmpty()) {
				return new ResponseEntity<>(ConstantUtil.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
			}
			
			Optional<Category> categoryOpt = catRepo.findById(request.getCategoryId());
			
			if(categoryOpt.isEmpty()) {
				return new ResponseEntity<>(ConstantUtil.CATEGORY_NOT_FOUND, HttpStatus.BAD_REQUEST);
			}
			
			Set<String> validImageTypes = Stream.of("png", "jpg", "jpeg", "gif").collect(Collectors.toSet());
			
			// Validation loop
			for(MultipartFile image : images) {
				if(images.length > 10) {
					return new ResponseEntity<>(ConstantUtil.IMAGE_LIMIT_EXCEEDED, HttpStatus.BAD_REQUEST);
				}
				
				if(image.getSize() > 1024 * 1024 * 5) { // 5 MB
					return new ResponseEntity<>(ConstantUtil.INVALID_FILE_SIZE, HttpStatus.BAD_REQUEST);
				}
				
				if(!validImageTypes.contains(StringUtils.getFilenameExtension(image.getOriginalFilename()))) {
					return new ResponseEntity<>(ConstantUtil.INVALID_IMAGE_TYPE, HttpStatus.BAD_REQUEST);
				}
			}
			
			Advertisement advertisement = new Advertisement();
			advertisement.setUser(userOpt.get());
			advertisement.setTitle(request.getTitle());
			advertisement.setDescription(request.getDescription());
			advertisement.setCreatedTimestamp(LocalDateTime.now());
			advertisement.setCategory(categoryOpt.get());
			advertisement.setPrice(null);
			advertisement.setLocation(null);
			advertisement.setEnabled(Boolean.TRUE);
			
			advertisement = adRepo.save(advertisement);
			
			// Persistence loop
			for(MultipartFile image : images) {
				AdvertisementImage adImage = new AdvertisementImage();
				
				adImage.setAdvertisement(advertisement);
				adImage.setMimeType(image.getContentType());
				adImage.setData(image.getBytes());
				
				adImageRepo.save(adImage);
			}
			
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		catch(Exception ex) {
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Object> listAds() {
		List<AdvertisementListResponse> responseList = new ArrayList<>();
		
		List<Advertisement> adList = adRepo.findAll();
		
		for(Advertisement ad : adList) {
			AdvertisementListResponse responseObj = new AdvertisementListResponse();
			
			responseObj.setAdvertisementId(ad.getAdvertisementId());
			responseObj.setDisplayName(ad.getUser().getDisplayName());
			responseObj.setTitle(ad.getTitle());
			responseObj.setDescription(ad.getDescription());
			responseObj.setCreatedTimestamp(ad.getCreatedTimestamp());
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
}