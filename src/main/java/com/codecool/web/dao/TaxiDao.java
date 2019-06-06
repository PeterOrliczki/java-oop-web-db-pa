package com.codecool.web.dao;

import com.codecool.web.model.Taxi;

import java.sql.SQLException;
import java.util.List;

public interface TaxiDao {

    List<Taxi> findAll() throws SQLException;

    Taxi findTaxiById(int id) throws SQLException;

    Taxi findByName(String name) throws SQLException;

    Taxi findByLicensePlate(String licensePlate) throws SQLException;

    boolean findIfTaxiExists(String name) throws SQLException;

    Taxi addTaxi(String name, String licensePlate, int capacity) throws SQLException;

    void updateTaxiNameById(int id, String name) throws SQLException;

    void updateTaxiLicensePlateById(int id, String licensePlate) throws SQLException;

    void updateTaxiCapacityById(int id, int capacity) throws SQLException;

    void deleteTaxiById(int id) throws SQLException;
}
