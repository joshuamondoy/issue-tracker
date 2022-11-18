package com.issuetracker.api.auth;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.issuetracker.api.DbUtility.DbUtility;

@Service
public class LoginAuthService {
	Connection connection;
	int flag = 0;

	public LoginAuthService() throws SQLException {
		connection = DbUtility.getConnection();
	}

	public int loginValidation(String email, String password) {
		try {
			PreparedStatement statement = connection
					.prepareStatement("SELECT * FROM user_table WHERE email = '" + email + "'");
			ResultSet rs = statement.executeQuery();
			// loop thru set of results from query
			while (rs.next()) {
				// column number of email in table
				if (rs.getString(4).equals(email) && rs.getString(5).equals(password)) {
					flag = 1;
				} else {
					System.out.println("Invalid email or password!");
					flag = 0;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return flag;

	}
}
