package com.codecool.web.servlet;

import com.codecool.web.dao.ActivityDao;
import com.codecool.web.dao.database.DatabaseActivityDao;
import com.codecool.web.model.Activity;
import com.codecool.web.service.ActivityService;
import com.codecool.web.service.simple.SimpleActivityService;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;


@WebServlet("/protected/activities")
public class ActivityLogServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            ActivityDao activityDao = new DatabaseActivityDao(connection);
            ActivityService activityService = new SimpleActivityService(activityDao);

            List<Activity> activities = activityService.findAll();

            sendMessage(response, HttpServletResponse.SC_OK, activities);
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }
}
