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

	public void addUser(User user) {
		try {
			insertUser(user.firstName(), user.lastName(), user.gender());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void updateUser(String id, User user) {
		try {
			updateUser(user.firstName(), user.lastName(), user.gender(), Long.parseLong(id));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void deleteUser(String id) {
		try {
			deleteUser(Long.parseLong(id));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
