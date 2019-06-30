package com.codecool.web.servlet;

import com.codecool.web.dao.FlightDao;
import com.codecool.web.dao.PlaneDao;
import com.codecool.web.dao.database.DatabaseFlightDao;
import com.codecool.web.dao.database.DatabasePlaneDao;
import com.codecool.web.model.Flight;
import com.codecool.web.service.FlightService;
import com.codecool.web.service.PlaneService;
import com.codecool.web.service.simple.SimpleFlightService;
import com.codecool.web.service.simple.SimplePlaneService;
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

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (Connection connection = getConnection(req.getServletContext())) {
            FlightDao flightDao = new DatabaseFlightDao(connection);
            FlightService flightService = new SimpleFlightService(flightDao);

            Flight flight = om.readValue(req.getInputStream(), Flight.class);

            flightService.updatePlaneIdById(flight.getId(), flight.getPlaneId());
            flightService.updateOriginById(flight.getId(), flight.getOrigin());
            flightService.updateDestinationById(flight.getId(), flight.getDestination());
            flightService.updateDateById(flight.getId(), flight.getDate());
            flightService.updateStartById(flight.getId(), flight.getStart());
            flightService.updateEndById(flight.getId(), flight.getEnd());
            flightService.updateClassById(flight.getId(), flight.getFlightClass());
            flightService.updatePriceById(flight.getId(), flight.getPrice());

            sendMessage(resp, HttpServletResponse.SC_OK, "Your data has been updated.");
        } catch (SQLException exc) {
            handleSqlError(resp, exc);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            FlightDao flightDao = new DatabaseFlightDao(connection);
            FlightService flightService = new SimpleFlightService(flightDao);

            PlaneDao planeDao = new DatabasePlaneDao(connection);
            PlaneService planeService = new SimplePlaneService(planeDao);

            int planeId = Integer.parseInt(request.getParameter("plane-id"));
            String flightOrigin = request.getParameter("flight-origin");
            String flightDestination = request.getParameter("flight-destination");
            String flightDate = request.getParameter("flight-date");
            int flightStart = Integer.parseInt(request.getParameter("flight-start"));
            int flightEnd = Integer.parseInt(request.getParameter("flight-end"));
            String flightClass = request.getParameter("flight-class");
            int flightPrice = Integer.parseInt(request.getParameter("flight-price"));

            if (planeService.findIfPlaneExists(planeId)) {
                flightService.addFlight(planeId, flightOrigin, flightDestination, flightDate, flightStart, flightEnd, flightClass, flightPrice);
                sendMessage(response, HttpServletResponse.SC_OK, "Flight successfully added");
            } else {
                sendMessage(response, HttpServletResponse.SC_NOT_FOUND, "Plane with corresponding id not found");
            }

        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }
}
