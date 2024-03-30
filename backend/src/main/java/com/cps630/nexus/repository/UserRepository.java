package com.cps630.nexus.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cps630.nexus.entity.User;
import com.cps630.nexus.security.LoginDetailsInterface;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	@Query(value =	"SELECT u.user_id AS userId, u.email_address AS emailAddress, u.enabled AS enabled, r.name AS roleName, u.password AS password "
				+	"FROM user u JOIN role r ON u.role_id = r.role_id WHERE u.email_address = :emailAddress", nativeQuery = true)
	public LoginDetailsInterface getLoginInfoByEmailAddress(@Param("emailAddress") String emailAddress);
	
	@Query(value =	"SELECT * FROM user WHERE email_address = :emailAddress", nativeQuery = true)
	public Optional<User> getByEmailAddress(@Param("emailAddress") String emailAddress);
	
	@Query(value =	"SELECT u.* FROM user u JOIN role r ON u.role_id = r.role_id", nativeQuery = true)
	public List<User> getUserList();
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE user SET password = :password WHERE user_id = :userId", nativeQuery = true)
	public void updatePassword(@Param("password") String password, @Param("userId") Integer userId);
}