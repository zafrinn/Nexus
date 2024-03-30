package com.cps630.nexus.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.StudyGroupMember;

@Repository
public interface StudyGroupMemberRepository extends JpaRepository<StudyGroupMember, Integer> {
	@Query(value =	"SELECT * FROM study_group_member WHERE study_group_id = :studyGroupId AND user_id = :userId", nativeQuery = true)
	public Optional<StudyGroupMember> getStudyGroupMember(@Param("studyGroupId") Integer studyGroupId, @Param("userId") Integer userId);
	
	@Query(value =	"SELECT * FROM study_group_member WHERE study_group_id = :studyGroupId", nativeQuery = true)
	public List<StudyGroupMember> getStudyGroupMemberList(@Param("studyGroupId") Integer studyGroupId);
}