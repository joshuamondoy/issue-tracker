package com.issuetracker.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issuetracker.api.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
}
