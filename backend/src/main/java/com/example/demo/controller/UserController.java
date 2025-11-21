package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public User loginOrRegister(@RequestBody User user) {
		return userService.loginOrRegister(user);
	}

	@PutMapping("/{id}/preferences")
	public User updatePreferences(@PathVariable Long id, @RequestBody User preferences) {
		return userService.updatePreferences(id, preferences.getLanguage(), preferences.getYearRange());
	}
}