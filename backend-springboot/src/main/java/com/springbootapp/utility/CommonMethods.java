package com.springbootapp.utility;

import java.util.List;

import com.springbootapp.dbops.DBConnection;
import com.springbootapp.models.User;

// this is the utility class 
public class CommonMethods extends DBConnection {

	public List<User> selectUser() {
		List<User> lstUser = null;
		try {
			lstUser = getUsers();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstUser;
	}

	public User addUser(User user) {
		try {
			insertUser(user.firstName(), user.lastName(), user.gender());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	public User updateUser(String id, User user) {
		try {
			updateUser(user.firstName(), user.lastName(), user.gender(), Long.parseLong(id));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	public String deleteUser(String id) {
		try {
			deleteUser(Long.parseLong(id));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "User with id " + id + " deleted successfully";
	}
}
