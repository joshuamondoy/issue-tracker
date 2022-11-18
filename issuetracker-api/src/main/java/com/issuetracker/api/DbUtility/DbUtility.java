package com.issuetracker.api.DbUtility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbUtility {
private static Connection connection = null;
	
	public static Connection getConnection() throws SQLException {
		
		if (connection != null) {
			return connection;
		} else {
			String driver = "com.mysql.cj.jdbc.Driver"; // mysql driver you can get it on internet
			String url = "jdbc:mysql://localhost:3306/issue_tracker_db?useSSL=false"; // this is from application.properties
			// get username and password in workbench
			String user = "issuetracker";
			String password = "issuetracker";
			
			try {
				Class.forName(driver);
				connection = DriverManager.getConnection(url, user, password);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return connection;
	}

}
