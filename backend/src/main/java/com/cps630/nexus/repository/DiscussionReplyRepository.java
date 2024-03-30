package com.cps630.nexus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cps630.nexus.entity.DiscussionReply;

@Repository
public interface DiscussionReplyRepository extends JpaRepository<DiscussionReply, Integer> {

}