package com.issuetracker.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.issuetracker.api.auth.LoginAuthService;
import com.issuetracker.api.entity.User;
import com.issuetracker.api.repository.UserRepository;

@Service
public class UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private LoginAuthService loginAuthService;
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	public User addUser(User user) {
		return userRepository.save(user);
	}
	
	//custom find method name will always start at findBy<FieldName>
	public User getUser(String email) {
		return userRepository.findByEmail(email);
	}
	
	public int authUser(String email, String password) {
		return loginAuthService.loginValidation(email, password);
	}
	

}
