package com.codecool.web.service.simple;

import com.codecool.web.dao.FlightDao;
import com.codecool.web.model.Flight;
import com.codecool.web.service.FlightService;

import java.sql.SQLException;
import java.util.List;

public final class SimpleFlightService implements FlightService {

    private final FlightDao flightDao;

    public SimpleFlightService(FlightDao flightDao) {
        this.flightDao = flightDao;
    }

    @Override
    public List<Flight> findAll() throws SQLException {
        return flightDao.findAll();
    }

    @Override
    public Flight addFlight(int planeId, String origin, String destination, String date, int start, int end, String flightClass, int price) throws SQLException {
        return flightDao.addFlight(planeId, origin, destination, date, start, end, flightClass, price);
    }

    @Override
    public void updatePlaneIdById(int id, int planeId) throws SQLException {
        flightDao.updatePlaneIdById(id, planeId);
    }

    @Override
    public void updateOriginById(int id, String origin) throws SQLException {
        flightDao.updateOriginById(id, origin);
    }

    @Override
    public void updateDestinationById(int id, String destination) throws SQLException {
        flightDao.updateDestinationById(id, destination);
    }

    @Override
    public void updateDateById(int id, String date) throws SQLException {
        flightDao.updateDateById(id, date);
    }

    @Override
    public void updateStartById(int id, int start) throws SQLException {
        flightDao.updateStartById(id, start);
    }

    @Override
    public void updateEndById(int id, int end) throws SQLException {
        flightDao.updateEndById(id, end);
    }

    @Override
    public void updateClassById(int id, String flightClass) throws SQLException {
        flightDao.updateClassById(id, flightClass);
    }

    @Override
    public void updatePriceById(int id, int price) throws SQLException {
        flightDao.updatePriceById(id, price);
    }

    @Override
    public void orderFlight(int userId, int flightId) throws SQLException {
        flightDao.orderFlight(userId, flightId);
    }

    @Override
    public List<Flight> findAllOrders(int userId) throws SQLException {
        return flightDao.findAllOrders(userId);
    }
}
