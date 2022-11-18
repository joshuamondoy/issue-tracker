package com.issuetracker.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.issuetracker.api.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
//	public int login(String email, String password)
}
