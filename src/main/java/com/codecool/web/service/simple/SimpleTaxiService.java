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
    public boolean findIfTaxiExists(int id) throws SQLException {
        return taxiDao.findIfTaxiExists(id);
    }

    @Override
    public Taxi addTaxi(String name, int capacity) throws SQLException {
        return taxiDao.addTaxi(name, capacity);
    }

    @Override
    public void updateNameById(int id, String name) throws SQLException {
        taxiDao.updateNameById(id, name);
    }

    @Override
    public void updateCapacityById(int id, int capacity) throws SQLException {
        taxiDao.updateCapacityById(id, capacity);
    }
}
