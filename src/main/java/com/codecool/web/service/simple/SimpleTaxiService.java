package com.codecool.web.service.simple;

import com.codecool.web.dao.TaxiDao;
import com.codecool.web.model.Taxi;
import com.codecool.web.service.TaxiService;

import java.sql.SQLException;
import java.util.List;

public final class SimpleTaxiService implements TaxiService {

    private final TaxiDao taxiDao;

    public SimpleTaxiService(TaxiDao taxiDao) {
        this.taxiDao = taxiDao;
    }

    @Override
    public List<Taxi> findAll() throws SQLException {
        return taxiDao.findAll();
    }

    @Override
    public Taxi findTaxiById(int id) throws SQLException {
        return taxiDao.findTaxiById(id);
    }

    @Override
    public Taxi findByName(String name) throws SQLException {
        return taxiDao.findByName(name);
    }

    @Override
    public Taxi findByLicensePlate(String licensePlate) throws SQLException {
        return taxiDao.findByLicensePlate(licensePlate);
    }

    @Override
    public boolean findIfTaxiExists(String name) throws SQLException {
        return taxiDao.findIfTaxiExists(name);
    }

    @Override
    public Taxi addTaxi(String name, String licensePlate, int capacity) throws SQLException {
        return taxiDao.addTaxi(name, licensePlate, capacity);
    }

    @Override
    public void updateTaxiNameById(int id, String name) throws SQLException {
        taxiDao.updateTaxiNameById(id, name);
    }

    @Override
    public void updateTaxiLicensePlateById(int id, String licensePlate) throws SQLException {
        taxiDao.updateTaxiLicensePlateById(id, licensePlate);
    }

    @Override
    public void updateTaxiCapacityById(int id, int capacity) throws SQLException {
        taxiDao.updateTaxiCapacityById(id, capacity);
    }

    @Override
    public void deleteTaxiById(int id) throws SQLException {
        taxiDao.deleteTaxiById(id);
    }
}
