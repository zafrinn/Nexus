package com.cps630.nexus.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.DiscussionReply;

@Repository
public interface DiscussionReplyRepository extends JpaRepository<DiscussionReply, Integer> {
	@Query(value =	"SELECT * FROM discussion_reply WHERE discussion_id = :discussionId", nativeQuery = true)
	public Optional<DiscussionReply> getDiscussionReply(@Param("discussionId") Integer discussionId);
}