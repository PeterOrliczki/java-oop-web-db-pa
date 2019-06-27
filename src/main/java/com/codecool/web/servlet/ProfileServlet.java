package com.codecool.web.servlet;

import com.codecool.web.dao.UserDao;
import com.codecool.web.dao.database.DatabaseUserDao;
import com.codecool.web.model.User;
import com.codecool.web.service.PasswordService;
import com.codecool.web.service.UserService;
import com.codecool.web.service.simple.SimpleUserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet("/protected/profile")
public final class ProfileServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);

            User user = (User) request.getSession().getAttribute("user");
            int userId = user.getId();

            sendMessage(response, HttpServletResponse.SC_OK, userService.findById(userId));
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (Connection connection = getConnection(req.getServletContext())) {
            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);
            PasswordService passwordService = new PasswordService();

            User user = om.readValue(req.getInputStream(), User.class);
            if (!user.getPassword().equals("*****")) {
                userService.updatePasswordById(user.getId(), passwordService.getHashedPassword(user.getPassword()));
            }
            userService.updateNameById(user.getId(), user.getName());
            userService.updateEmailById(user.getId(), user.getEmail());

            req.getSession().setAttribute("user", user);
            sendMessage(resp, HttpServletResponse.SC_OK, "Your data has been updated.");
        } catch (SQLException exc) {
            handleSqlError(resp, exc);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            sendMessage(resp, HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
        }
    }
}
