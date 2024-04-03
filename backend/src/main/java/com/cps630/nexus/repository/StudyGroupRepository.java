package com.cps630.nexus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.StudyGroup;

@Repository
public interface StudyGroupRepository extends JpaRepository<StudyGroup, Integer> {
	@Query(value =	"SELECT * FROM study_group WHERE timestamp > NOW()", nativeQuery = true)
	public List<StudyGroup> getAllActive();
}