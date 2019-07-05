package com.codecool.web.dao;

import com.codecool.web.model.Taxi;

import java.sql.SQLException;
import java.util.List;

public interface TaxiDao {

    List<Taxi> findAll() throws SQLException;

    boolean findIfTaxiExists(int id) throws SQLException;

    Taxi addTaxi(String name, int capacity) throws SQLException;

    void updateNameById(int id, String name) throws SQLException;

    void updateCapacityById(int id, int capacity) throws SQLException;
}
