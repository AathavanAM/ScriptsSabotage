package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User loginOrRegister(User userInput) {
		Optional<User> existing = userRepository.findByMobileNumber(userInput.getMobileNumber());
		if (existing.isPresent()) {
			return existing.get();
		} else {
			User newUser = User.builder().username(userInput.getUsername()).mobileNumber(userInput.getMobileNumber())
					.gender(userInput.getGender()).build();
			return userRepository.save(newUser);
		}
	}

	public User updatePreferences(Long id, String language, String yearRange) {
		User user = userRepository.findById(id).orElseThrow();
		user.setLanguage(language);
		user.setYearRange(yearRange);
		return userRepository.save(user);
	}
}