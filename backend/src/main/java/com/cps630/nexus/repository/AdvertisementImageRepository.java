package com.cps630.nexus.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.AdvertisementImage;

@Repository
public interface AdvertisementImageRepository extends JpaRepository<AdvertisementImage, Integer> {
	@Query(value =	"SELECT * FROM advertisement_image WHERE advertisement_id = :advertisementId", nativeQuery = true)
	public List<AdvertisementImage> findAllByAdvertisementId(@Param("advertisementId") Integer advertisementId);
	
	@Query(value =	"SELECT * FROM advertisement_image WHERE advertisement_id = :advertisementId LIMIT 1", nativeQuery = true)
	public Optional<AdvertisementImage> getPosterImageByAdvertisementId(@Param("advertisementId") Integer advertisementId);
}