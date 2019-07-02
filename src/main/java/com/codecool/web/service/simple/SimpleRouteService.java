package com.codecool.web.service.simple;

import com.codecool.web.dao.RouteDao;
import com.codecool.web.model.Route;
import com.codecool.web.service.RouteService;

import java.sql.SQLException;
import java.util.List;

public final class SimpleRouteService implements RouteService {

    private final RouteDao routeDao;

    public SimpleRouteService(RouteDao routeDao) {
        this.routeDao = routeDao;
    }

    @Override
    public List<Route> findAll() throws SQLException {
        return routeDao.findAll();
    }

    @Override
    public Route findById(int id) throws SQLException {
        return routeDao.findById(id);
    }

    @Override
    public Route findByTaxiId(int id) throws SQLException {
        return routeDao.findByTaxiId(id);
    }

    @Override
    public Route findByOrigin(String origin) throws SQLException {
        return routeDao.findByOrigin(origin);
    }

    @Override
    public Route findByDestination(String destination) throws SQLException {
        return routeDao.findByDestination(destination);
    }

    @Override
    public Route findByDate(String date) throws SQLException {
        return routeDao.findByDate(date);
    }

    @Override
    public Route findByStart(int start) throws SQLException {
        return routeDao.findByStart(start);
    }

    @Override
    public Route findByEnd(int end) throws SQLException {
        return routeDao.findByEnd(end);
    }

    @Override
    public Route findByPrice(int price) throws SQLException {
        return routeDao.findByPrice(price);
    }

    @Override
    public Route addRoute(int taxiId, String origin, String destination, String date, int start, int end, int price) throws SQLException {
        return routeDao.addRoute(taxiId, origin, destination, date, start, end, price);
    }

    @Override
    public void updateTaxiIdById(int id, int taxiId) throws SQLException {
        routeDao.updateTaxiIdById(id, taxiId);
    }

    @Override
    public void updateOriginById(int id, String origin) throws SQLException {
        routeDao.updateOriginById(id, origin);
    }

    @Override
    public void updateDestinationById(int id, String destination) throws SQLException {
        routeDao.updateDestinationById(id, destination);
    }

    @Override
    public void updateDateById(int id, String date) throws SQLException {
        routeDao.updateDateById(id, date);
    }

    @Override
    public void updateStartById(int id, int start) throws SQLException {
        routeDao.updateStartById(id, start);
    }

    @Override
    public void updateEndById(int id, int end) throws SQLException {
        routeDao.updateEndById(id, end);
    }

    @Override
    public void updatePriceById(int id, int price) throws SQLException {
        routeDao.updatePriceById(id, price);
    }

    @Override
    public void deleteById(int id) throws SQLException {
        routeDao.deleteById(id);
    }

    @Override
    public void orderRoute(int userId, int routeId) throws SQLException {
        routeDao.orderRoute(userId, routeId);
    }

    @Override
    public List<Route> findAllOrders(int userId) throws SQLException {
        return routeDao.findAllOrders(userId);
    }
}
