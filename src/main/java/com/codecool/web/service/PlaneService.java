package com.codecool.web.service;

import com.codecool.web.model.Plane;

import java.sql.SQLException;
import java.util.List;

public interface PlaneService {

    List<Plane> findAll() throws SQLException;

    Plane findPlaneById(int id) throws SQLException;

    Plane findByName(String name) throws SQLException;

    boolean findIfPlaneExists(String name) throws SQLException;

    Plane addPlane(String name, int capacity) throws SQLException;

    void updatePlaneNameById(int id, String name) throws SQLException;

    void updatePlaneCapacityById(int id, int capacity) throws SQLException;

    void deletePlaneById(int id) throws SQLException;
}
