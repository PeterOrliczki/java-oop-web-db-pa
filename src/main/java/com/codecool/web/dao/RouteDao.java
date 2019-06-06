package com.codecool.web.dao;

import com.codecool.web.model.Route;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

public interface RouteDao {

    List<Route> findAll() throws SQLException;

    Route findRouteById(int id) throws SQLException;

    Route findRouteByTaxiId(int id) throws SQLException;

    Route findByOrigin(String origin) throws SQLException;

    Route findByDestination(String destination) throws SQLException;

    Route findByDate(LocalDate date) throws SQLException;

    Route findByStart(int start) throws SQLException;

    Route findByEnd(int end) throws SQLException;

    Route findByPrice(int price) throws SQLException;

    Route addRoute(int taxiId, String routeOrigin, String routeDestination, LocalDate routeDate, int routeStart, int routeEnd, int routePrice) throws SQLException;

    void updateTaxiIdById(int id, int taxiId) throws SQLException;

    void updateOriginById(int id, String origin) throws SQLException;

    void updateDestinationById(int id, String destination) throws SQLException;

    void updateDateById(int id, LocalDate date) throws SQLException;

    void updateStartById(int id, int start) throws SQLException;

    void updateEndById(int id, int end) throws SQLException;

    void updatePriceById(int id, int price) throws SQLException;

    void deleteRouteById(int id) throws SQLException;
}
