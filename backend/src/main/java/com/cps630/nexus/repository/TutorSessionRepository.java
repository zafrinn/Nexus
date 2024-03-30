package com.cps630.nexus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.TutorSession;

@Repository
public interface TutorSessionRepository extends JpaRepository<TutorSession, Integer> {

}