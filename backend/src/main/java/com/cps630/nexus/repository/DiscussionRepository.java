package com.cps630.nexus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.Discussion;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Integer> {

}