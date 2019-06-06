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
    public Plane findPlaneById(int id) throws SQLException {
        return planeDao.findPlaneById(id);
    }

    @Override
    public Plane findByName(String name) throws SQLException {
        return planeDao.findByName(name);
    }

    @Override
    public boolean findIfPlaneExists(String name) throws SQLException {
        return planeDao.findIfPlaneExists(name);
    }

    @Override
    public Plane addPlane(String name, int capacity) throws SQLException {
        return planeDao.addPlane(name, capacity);
    }

    @Override
    public void updatePlaneNameById(int id, String name) throws SQLException {
        planeDao.updatePlaneNameById(id, name);
    }

    @Override
    public void updatePlaneCapacityById(int id, int capacity) throws SQLException {
        planeDao.updatePlaneCapacityById(id, capacity);
    }

    @Override
    public void deletePlaneById(int id) throws SQLException {
        planeDao.deletePlaneById(id);
    }
}
