package com.codecool.web.service;

import com.codecool.web.model.Flight;

import java.sql.SQLException;
import java.util.List;

public interface FlightService {

    List<Flight> findAll() throws SQLException;

    Flight addFlight(int planeId, String origin, String destination, String date, int start, int end, String flightClass, int price) throws SQLException;

    void updatePlaneIdById(int id, int planeId) throws SQLException;

    void updateOriginById(int id, String origin) throws SQLException;

    void updateDestinationById(int id, String destination) throws SQLException;

    void updateDateById(int id, String date) throws SQLException;

    void updateStartById(int id, int start) throws SQLException;

    void updateEndById(int id, int end) throws SQLException;

    void updateClassById(int id, String flightClass) throws SQLException;

    void updatePriceById(int id, int price) throws SQLException;

    void orderFlight(int userId, int flightId) throws SQLException;

    List<Flight> findAllOrders(int userId) throws SQLException;
}
