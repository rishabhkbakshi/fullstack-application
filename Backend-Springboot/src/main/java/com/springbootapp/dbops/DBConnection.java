package com.springbootapp.dbops;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import com.springbootapp.models.User;

public class DBConnection {

	// Code to make a connection b/w java and mysql
	private Connection getConnection() throws Exception {
		Properties prop = ReadPropertiesFile.readPropertiesFile("./src/main/resources/application.properties");

		String conStr = prop.getProperty("dbUrl") + prop.getProperty("dbName");
		String uName = prop.getProperty("uName");
		String password = prop.getProperty("password");
		String className = prop.getProperty("className");

		Class.forName(className);
		Connection conn = DriverManager.getConnection(conStr, uName, password);
		return conn;
	}

	// Code to execute select query in the database
	public static List<User> getUsers() throws Exception {
		List<User> lstDBUser = new ArrayList<User>();
		DBConnection dbObj = new DBConnection();
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = dbObj.getConnection();
			stmt = (Statement) dbObj.getConnection().createStatement();
			ResultSet rs = (ResultSet) stmt.executeQuery("select * from springboottable");

			while (rs.next()) {
				lstDBUser.add(new User(rs.getInt(1), rs.getString("firstname"), rs.getString("lastname"),
						rs.getString("gender")));

			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
		return lstDBUser;

	}

	// Code to execute insert query in the database
	public static void insertUser(String firstName, String lastName, String gender) throws Exception {
		DBConnection dbObj = new DBConnection();
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = dbObj.getConnection();
			stmt = (Statement) conn.createStatement();
			stmt.executeUpdate("Insert into springboottable (firstname, lastname, gender)" + "values('" + firstName
					+ "','" + lastName + "','" + gender + "')");
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
	}

	// Code to execute update query in the database
	public static void updateUser(String firstName, String lastName, String gender, long id) throws Exception {
		DBConnection dbObj = new DBConnection();
		Connection conn = null;
		PreparedStatement pStmt = null;
		try {
			conn = dbObj.getConnection();
			pStmt = conn.prepareStatement("update springboottable set firstname=?, lastname=?, gender=? where Id=? ");
			pStmt.setString(1, firstName);
			pStmt.setString(2, lastName);
			pStmt.setString(3, gender);
			pStmt.setLong(4, id);
			pStmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
	}

	// Code to execute delete query in the database
	public static void deleteUser(long id) throws Exception {
		DBConnection dbObj = new DBConnection();
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = dbObj.getConnection();
			stmt = (Statement) conn.createStatement();
			stmt.executeUpdate("delete from  springboottable where id=" + id);
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				conn.close();
			}
		}
	}
}
