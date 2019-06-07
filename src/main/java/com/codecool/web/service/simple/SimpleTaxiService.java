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
    public Taxi findById(int id) throws SQLException {
        return taxiDao.findById(id);
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
    public void updateNameById(int id, String name) throws SQLException {
        taxiDao.updateNameById(id, name);
    }

    @Override
    public void updateLicensePlateById(int id, String licensePlate) throws SQLException {
        taxiDao.updateLicensePlateById(id, licensePlate);
    }

    @Override
    public void updateCapacityById(int id, int capacity) throws SQLException {
        taxiDao.updateCapacityById(id, capacity);
    }

    @Override
    public void deleteById(int id) throws SQLException {
        taxiDao.deleteById(id);
    }
}
