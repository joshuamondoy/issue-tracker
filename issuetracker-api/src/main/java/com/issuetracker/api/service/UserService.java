package com.issuetracker.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.issuetracker.api.entity.User;
import com.issuetracker.api.repository.UserRepository;

@Service
public class UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	public User addUser(User user) {
		return userRepository.save(user);
	}

	

	

}
