package com.codecool.web.servlet;

import com.codecool.web.dao.PlaneDao;
import com.codecool.web.dao.database.DatabasePlaneDao;
import com.codecool.web.model.Plane;
import com.codecool.web.service.PlaneService;
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


@WebServlet("/protected/planes")
public class PlanesServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            PlaneDao planeDao = new DatabasePlaneDao(connection);
            PlaneService planeService = new SimplePlaneService(planeDao);

            List<Plane> planes = planeService.findAll();

            sendMessage(response, HttpServletResponse.SC_OK, planes);
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (Connection connection = getConnection(req.getServletContext())) {
            PlaneDao planeDao = new DatabasePlaneDao(connection);
            PlaneService planeService = new SimplePlaneService(planeDao);

            Plane plane = om.readValue(req.getInputStream(), Plane.class);

            planeService.updateNameById(plane.getId(), plane.getName());
            planeService.updateCapacityById(plane.getId(), plane.getCapacity());

            sendMessage(resp, HttpServletResponse.SC_OK, "Your data has been updated.");
        } catch (SQLException exc) {
            handleSqlError(resp, exc);
        }
    }
}
