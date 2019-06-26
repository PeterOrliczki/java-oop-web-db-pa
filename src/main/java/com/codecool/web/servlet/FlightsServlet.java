package com.codecool.web.servlet;

import com.codecool.web.dao.FlightDao;
import com.codecool.web.dao.database.DatabaseFlightDao;
import com.codecool.web.model.Flight;
import com.codecool.web.service.FlightService;
import com.codecool.web.service.simple.SimpleFlightService;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;


@WebServlet("/protected/flights")
public class FlightsServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            FlightDao flightDao = new DatabaseFlightDao(connection);
            FlightService flightService = new SimpleFlightService(flightDao);

            List<Flight> flights = flightService.findAll();

            sendMessage(response, HttpServletResponse.SC_OK, flights);
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }
}
