package com.cps630.nexus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.Textbook;

@Repository
public interface TextbookRepository extends JpaRepository<Textbook, Integer> {
	@Query(value =	"SELECT * FROM textbook WHERE enabled = 1", nativeQuery = true)
	public List<Textbook> getEnabledTextbookList();
}