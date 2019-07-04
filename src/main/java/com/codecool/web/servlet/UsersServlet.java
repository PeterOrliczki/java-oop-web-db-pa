package com.codecool.web.servlet;

import com.codecool.web.dao.UserDao;
import com.codecool.web.dao.database.DatabaseUserDao;
import com.codecool.web.model.User;
import com.codecool.web.service.UserService;
import com.codecool.web.service.simple.SimpleUserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/protected/users")
public final class UsersServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);

            List<User> users = userService.findAll();

            sendMessage(response, HttpServletResponse.SC_OK, users);
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);

            User user = (User) request.getSession().getAttribute("user");

            int userDeposit = Integer.parseInt(request.getParameter("user-deposit"));

            userService.addToBalanceById(user.getId(), userDeposit);

            sendMessage(response, HttpServletResponse.SC_OK, "Deposit successfully completed");
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);

            int id = Integer.valueOf(request.getParameter("id"));

            if (userService.findIfUserIdExistsInUsersFlights(id)) {
                userService.deleteFromUsersFlightsById(id);
            }
            if (userService.findIfUserIdExistsInUsersRoutes(id)) {
                userService.deleteFromUsersRoutesById(id);
            }
            userService.deleteById(id);

            sendMessage(response, HttpServletResponse.SC_OK, "User succesfully deleted");
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }
}

