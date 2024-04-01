package com.cps630.nexus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.TutorSession;

@Repository
public interface TutorSessionRepository extends JpaRepository<TutorSession, Integer> {
	@Query(value =	"SELECT * FROM tutor_session WHERE enabled = 1", nativeQuery = true)
	public List<TutorSession> getEnabledTutorSessionList();
}