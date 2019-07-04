package com.codecool.web.servlet;

import com.codecool.web.dao.FlightDao;
import com.codecool.web.dao.RouteDao;
import com.codecool.web.dao.UserDao;
import com.codecool.web.dao.database.DatabaseFlightDao;
import com.codecool.web.dao.database.DatabaseRouteDao;
import com.codecool.web.dao.database.DatabaseUserDao;
import com.codecool.web.model.Flight;
import com.codecool.web.model.Route;
import com.codecool.web.model.User;
import com.codecool.web.service.FlightService;
import com.codecool.web.service.RouteService;
import com.codecool.web.service.UserService;
import com.codecool.web.service.simple.SimpleFlightService;
import com.codecool.web.service.simple.SimpleRouteService;
import com.codecool.web.service.simple.SimpleUserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/protected/orders")
public class OrderServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            FlightDao flightDao = new DatabaseFlightDao(connection);
            FlightService flightService = new SimpleFlightService(flightDao);

            RouteDao routeDao = new DatabaseRouteDao(connection);
            RouteService routeService = new SimpleRouteService(routeDao);

            User user = (User) request.getSession().getAttribute("user");

            List<Flight> flightOrders = flightService.findAllOrders(user.getId());
            List<Route> routeOrders = routeService.findAllOrders(user.getId());
            List<Object> allOrders = new ArrayList<>();
            allOrders.addAll(flightOrders);
            allOrders.addAll(routeOrders);

            sendMessage(response, HttpServletResponse.SC_OK, allOrders);
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            FlightDao flightDao = new DatabaseFlightDao(connection);
            FlightService flightService = new SimpleFlightService(flightDao);

            RouteDao routeDao = new DatabaseRouteDao(connection);
            RouteService routeService = new SimpleRouteService(routeDao);

            UserDao userDao = new DatabaseUserDao(connection);
            UserService userService = new SimpleUserService(userDao);

            User user = (User) request.getSession().getAttribute("user");

            if (request.getParameter("flight-id") != null) {
                int flightPrice = Integer.parseInt(request.getParameter("flight-price"));
                if (user.getBalance() >= flightPrice) {
                    int flightId = Integer.parseInt(request.getParameter("flight-id"));

                    flightService.orderFlight(user.getId(), flightId);
                    userService.subtractFromBalanceById(user.getId(), flightPrice);

                    sendMessage(response, HttpServletResponse.SC_OK, "Order successfully completed");
                } else {
                    sendMessage(response, HttpServletResponse.SC_BAD_REQUEST, "Your balance is not high enough");
                }
            } else {
                int routePrice = Integer.parseInt(request.getParameter("route-price"));
                if (user.getBalance() >= routePrice) {
                    int routeId = Integer.parseInt(request.getParameter("route-id"));

                    routeService.orderRoute(user.getId(), routeId);
                    userService.subtractFromBalanceById(user.getId(), routePrice);

                    sendMessage(response, HttpServletResponse.SC_OK, "Order successfully completed");
                } else {
                    sendMessage(response, HttpServletResponse.SC_BAD_REQUEST, "Your balance is not high enough");
                }
            }
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }
}
