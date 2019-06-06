package com.codecool.web.service.simple;

import com.codecool.web.dao.RouteDao;
import com.codecool.web.model.Route;
import com.codecool.web.service.RouteService;

import java.sql.SQLException;
import java.time.LocalDate;
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
    public Route findRouteById(int id) throws SQLException {
        return routeDao.findRouteById(id);
    }

    @Override
    public Route findRouteByTaxiId(int id) throws SQLException {
        return routeDao.findRouteByTaxiId(id);
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
    public Route findByDate(LocalDate date) throws SQLException {
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
    public Route addRoute(int taxiId, String routeOrigin, String routeDestination, LocalDate routeDate, int routeStart, int routeEnd, int routePrice) throws SQLException {
        return routeDao.addRoute(taxiId, routeOrigin, routeDestination, routeDate, routeStart, routeEnd, routePrice);
    }

    @Override
    public void updateTaxiIdById(int id, int taxiId) throws SQLException {
        routeDao.updateTaxiIdById(id, taxiId);
    }

    @Override
    public void updateOriginById(int id, String origin) throws SQLException {
        routeDao.findByOrigin(origin);
    }

    @Override
    public void updateDestinationById(int id, String destination) throws SQLException {
        routeDao.updateDestinationById(id, destination);
    }

    @Override
    public void updateDateById(int id, LocalDate date) throws SQLException {
        routeDao.findByDate(date);
    }

    @Override
    public void updateStartById(int id, int start) throws SQLException {
        routeDao.findByStart(start);
    }

    @Override
    public void updateEndById(int id, int end) throws SQLException {
        routeDao.findByEnd(end);
    }

    @Override
    public void updatePriceById(int id, int price) throws SQLException {
        routeDao.updatePriceById(id, price);
    }

    @Override
    public void deleteRouteById(int id) throws SQLException {
        routeDao.deleteRouteById(id);
    }
}
