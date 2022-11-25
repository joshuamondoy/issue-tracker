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

	// the flaws of this is when user input random characters as email it will return 1 for some reason
	// so in our frontend I use form validation to validate the input email before passing the input as email argument
	public int loginValidation(String email, String password) {
		try {
			PreparedStatement statement = connection
					.prepareStatement("SELECT * FROM user_table WHERE email = '" + email + "'");
			ResultSet rs = statement.executeQuery();
			// loop thru set of results from query
			while (rs.next()) {
				// column number of email in table
				if (rs.getString(4).equals(email) && rs.getString(5).equals(password)) {
					System.out.println("Valid email and password");
					flag = 1;
					
			
				} else {
					System.out.println("Invalid email or password!");
					flag = 0;
				}
			}
System.out.println(flag);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return flag;

	}
}
