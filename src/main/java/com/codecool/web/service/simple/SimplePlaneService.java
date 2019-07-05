package com.codecool.web.service.simple;

import com.codecool.web.dao.PlaneDao;
import com.codecool.web.model.Plane;
import com.codecool.web.service.PlaneService;

import java.sql.SQLException;
import java.util.List;

public final class SimplePlaneService implements PlaneService {

    private final PlaneDao planeDao;

    public SimplePlaneService(PlaneDao planeDao) {
        this.planeDao = planeDao;
    }

    @Override
    public List<Plane> findAll() throws SQLException {
        return planeDao.findAll();
    }

    @Override
    public boolean findIfPlaneExists(int id) throws SQLException {
        return planeDao.findIfPlaneExists(id);
    }

    @Override
    public Plane addPlane(String name, int capacity) throws SQLException {
        return planeDao.addPlane(name, capacity);
    }

    @Override
    public void updateNameById(int id, String name) throws SQLException {
        planeDao.updateNameById(id, name);
    }

    @Override
    public void updateCapacityById(int id, int capacity) throws SQLException {
        planeDao.updateCapacityById(id, capacity);
    }
}
