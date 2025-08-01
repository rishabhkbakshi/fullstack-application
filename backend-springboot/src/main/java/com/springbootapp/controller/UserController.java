package com.springbootapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springbootapp.models.User;
import com.springbootapp.utility.CommonMethods;

// This is the controller which manage the all API endpoints
@RestController
public class UserController extends CommonMethods {

	/*
	 * @CrossOrigin is used to overcome the CORS issue
	 * When user call the api from Front-end
	 */

	// Select operation
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping("/users")
	public List<User> getUserEndPoint(@RequestParam(value = "firstName", defaultValue = "Rishabh") String firstName,
			@RequestParam(value = "lastName", defaultValue = "Bakshi") String lastName,
			@RequestParam(value = "gender", defaultValue = "male") String gender) {
		return selectUser();
	}

	// Insert operation
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public User addUserEndPoint(@RequestBody User user) {
		return addUser(user);
	}

	// Update operation
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	public User updateUserEndPoint(@PathVariable String id, @RequestBody User user) {
		return updateUser(id, user);
	}

	// Delete operation
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void deleteUserEndPoint(@PathVariable String id) {
		deleteUser(id);
	}
}