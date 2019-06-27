package com.codecool.web.servlet;

import com.codecool.web.dao.RouteDao;
import com.codecool.web.dao.database.DatabaseRouteDao;
import com.codecool.web.model.Route;
import com.codecool.web.service.RouteService;
import com.codecool.web.service.simple.SimpleRouteService;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;


@WebServlet("/protected/routes")
public class RoutesServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            RouteDao routeDao = new DatabaseRouteDao(connection);
            RouteService routeService = new SimpleRouteService(routeDao);

            List<Route> routes = routeService.findAll();

            sendMessage(response, HttpServletResponse.SC_OK, routes);
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (Connection connection = getConnection(req.getServletContext())) {
            RouteDao routeDao = new DatabaseRouteDao(connection);
            RouteService routeService = new SimpleRouteService(routeDao);

            Route route = om.readValue(req.getInputStream(), Route.class);

            routeService.updateOriginById(route.getId(), route.getOrigin());
            routeService.updateDestinationById(route.getId(), route.getDestination());
            routeService.updateStartById(route.getId(), route.getStart());
            routeService.updateEndById(route.getId(), route.getEnd());

            sendMessage(resp, HttpServletResponse.SC_OK, "Your data has been updated.");
        } catch (SQLException exc) {
            handleSqlError(resp, exc);
        }
    }
}

