package com.codecool.web.servlet;

import com.codecool.web.dao.TaxiDao;
import com.codecool.web.dao.database.DatabaseTaxiDao;
import com.codecool.web.model.Taxi;
import com.codecool.web.service.TaxiService;
import com.codecool.web.service.simple.SimpleTaxiService;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;


@WebServlet("/protected/taxis")
public class TaxisServlet extends AbstractServlet {

    private final ObjectMapper om = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            TaxiDao taxiDao = new DatabaseTaxiDao(connection);
            TaxiService taxiService = new SimpleTaxiService(taxiDao);

            List<Taxi> taxis = taxiService.findAll();

            sendMessage(response, HttpServletResponse.SC_OK, taxis);
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (Connection connection = getConnection(req.getServletContext())) {
            TaxiDao taxiDao = new DatabaseTaxiDao(connection);
            TaxiService taxiService = new SimpleTaxiService(taxiDao);

            Taxi taxi = om.readValue(req.getInputStream(), Taxi.class);

            taxiService.updateNameById(taxi.getId(), taxi.getName());
            taxiService.updateLicensePlateById(taxi.getId(), taxi.getLicensePlate());
            taxiService.updateCapacityById(taxi.getId(), taxi.getCapacity());

            sendMessage(resp, HttpServletResponse.SC_OK, "Your data has been updated.");
        } catch (SQLException exc) {
            handleSqlError(resp, exc);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (Connection connection = getConnection(request.getServletContext())) {
            TaxiDao taxiDao = new DatabaseTaxiDao(connection);
            TaxiService taxiService = new SimpleTaxiService(taxiDao);

            String taxiName = request.getParameter("taxi-name");
            String taxiLicensePlate = request.getParameter("taxi-license-plate");
            int taxiCapacity = Integer.parseInt(request.getParameter("taxi-capacity"));

            taxiService.addTaxi(taxiName, taxiLicensePlate, taxiCapacity);

            sendMessage(response, HttpServletResponse.SC_OK, "Taxi successfully added");
        } catch (SQLException exc) {
            handleSqlError(response, exc);
        }
    }
}

