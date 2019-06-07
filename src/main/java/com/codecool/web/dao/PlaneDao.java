package com.codecool.web.dao;

import com.codecool.web.model.Plane;

import java.sql.SQLException;
import java.util.List;

public interface PlaneDao {

    List<Plane> findAll() throws SQLException;

    Plane findById(int id) throws SQLException;

    Plane findByName(String name) throws SQLException;

    boolean findIfPlaneExists(String name) throws SQLException;

    Plane addPlane(String name, int capacity) throws SQLException;

    void updateNameById(int id, String name) throws SQLException;

    void updateCapacityById(int id, int capacity) throws SQLException;

    void deleteById(int id) throws SQLException;
}
