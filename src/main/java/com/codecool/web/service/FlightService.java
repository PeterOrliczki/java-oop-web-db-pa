package com.codecool.web.service;

import com.codecool.web.model.Flight;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

public interface FlightService {

    List<Flight> findAll() throws SQLException;

    Flight findFlightById(int id) throws SQLException;

    Flight findFlightByPlaneId(int id) throws SQLException;

    Flight findByOrigin(String origin) throws SQLException;

    Flight findByDestination(String destination) throws SQLException;

    Flight findByDate(LocalDate date) throws SQLException;

    Flight findByStart(int start) throws SQLException;

    Flight findByEnd(int end) throws SQLException;

    Flight findByClass(String flightClass) throws SQLException;

    Flight findByPrice(int price) throws SQLException;

    Flight addFlight(int planeId, String flightOrigin, String flightDestination, LocalDate flightDate, int flightStart, int flightEnd, String flightClass, int flightPrice) throws SQLException;

    void updatePlaneIdById(int id, int planeId) throws SQLException;

    void updateOriginById(int id, String origin) throws SQLException;

    void updateDestinationById(int id, String destination) throws SQLException;

    void updateDateById(int id, LocalDate date) throws SQLException;

    void updateStartById(int id, int start) throws SQLException;

    void updateEndById(int id, int end) throws SQLException;

    void updateClassById(int id, String flightClass) throws SQLException;

    void updatePriceById(int id, int price) throws SQLException;

    void deleteFlightById(int id) throws SQLException;
}
