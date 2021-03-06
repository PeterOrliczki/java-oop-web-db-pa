package com.codecool.web.service;

import com.codecool.web.model.Route;

import java.sql.SQLException;
import java.util.List;

public interface RouteService {

    List<Route> findAll() throws SQLException;

    Route addRoute(int taxiId, String origin, String destination, String date, int start, int end, int price) throws SQLException;

    void updateTaxiIdById(int id, int taxiId) throws SQLException;

    void updateOriginById(int id, String origin) throws SQLException;

    void updateDestinationById(int id, String destination) throws SQLException;

    void updateDateById(int id, String date) throws SQLException;

    void updateStartById(int id, int start) throws SQLException;

    void updateEndById(int id, int end) throws SQLException;

    void updatePriceById(int id, int price) throws SQLException;

    void orderRoute(int userId, int routeId) throws SQLException;

    List<Route> findAllOrders(int userId) throws SQLException;
}
