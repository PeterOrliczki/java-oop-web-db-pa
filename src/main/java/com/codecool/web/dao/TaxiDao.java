package com.codecool.web.dao;

import com.codecool.web.model.Taxi;

import java.sql.SQLException;
import java.util.List;

public interface TaxiDao {

    List<Taxi> findAll() throws SQLException;

    Taxi findById(int id) throws SQLException;

    Taxi findByName(String name) throws SQLException;

    Taxi findByLicensePlate(String licensePlate) throws SQLException;

    boolean findIfTaxiExists(int id) throws SQLException;

    boolean findIfTaxiExistsByName(String name) throws SQLException;

    Taxi addTaxi(String name, String licensePlate, int capacity) throws SQLException;

    void updateNameById(int id, String name) throws SQLException;

    void updateLicensePlateById(int id, String licensePlate) throws SQLException;

    void updateCapacityById(int id, int capacity) throws SQLException;

    void deleteById(int id) throws SQLException;
}
