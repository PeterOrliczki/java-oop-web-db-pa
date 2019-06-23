package com.codecool.web.service.simple;

import com.codecool.web.dao.FlightDao;
import com.codecool.web.model.Flight;
import com.codecool.web.service.FlightService;

import java.sql.SQLException;
import java.time.LocalDate;
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
    public Flight findById(int id) throws SQLException {
        return flightDao.findById(id);
    }

    @Override
    public Flight findByPlaneId(int id) throws SQLException {
        return flightDao.findByPlaneId(id);
    }

    @Override
    public Flight findByOrigin(String origin) throws SQLException {
        return flightDao.findByOrigin(origin);
    }

    @Override
    public Flight findByDestination(String destination) throws SQLException {
        return flightDao.findByDestination(destination);
    }

    @Override
    public Flight findByDate(LocalDate date) throws SQLException {
        return flightDao.findByDate(date);
    }

    @Override
    public Flight findByStart(int start) throws SQLException {
        return flightDao.findByStart(start);
    }

    @Override
    public Flight findByEnd(int end) throws SQLException {
        return flightDao.findByEnd(end);
    }

    @Override
    public Flight findByClass(String flightClass) throws SQLException {
        return flightDao.findByClass(flightClass);
    }

    @Override
    public Flight findByPrice(int price) throws SQLException {
        return flightDao.findByPrice(price);
    }

    @Override
    public Flight addFlight(int planeId, String origin, String destination, LocalDate date, int start, int end, String flightClass, int price) throws SQLException {
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
    public void updateDateById(int id, LocalDate date) throws SQLException {
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
    public void deleteById(int id) throws SQLException {
        flightDao.deleteById(id);
    }
}
