package com.codecool.web.dao.database;

import com.codecool.web.dao.TaxiDao;
import com.codecool.web.model.Taxi;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class DatabaseTaxiDao extends AbstractDao implements TaxiDao {

    public DatabaseTaxiDao(Connection connection) {
        super(connection);
    }

    @Override
    public List<Taxi> findAll() throws SQLException {
        String sql = "SELECT * FROM taxis";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            List<Taxi> taxis = new ArrayList<>();
            while (resultSet.next()) {
                taxis.add(fetchTaxi(resultSet));
            }
            return taxis;
        }
    }

    @Override
    public boolean findIfTaxiExists(int id) throws SQLException {
        List<Taxi> taxis = new ArrayList<>();
        String sql = "SELECT * FROM taxis WHERE taxi_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public Taxi addTaxi(String name, int capacity) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO taxis(taxi_name, taxi_capacity) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, name);
            statement.setInt(2, capacity);
            executeInsert(statement);
            int id = fetchGeneratedId(statement);
            connection.commit();
            return new Taxi(id, name, capacity);
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    @Override
    public void updateNameById(int id, String name) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE taxis SET taxi_name=? WHERE taxi_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, name);
            statement.setInt(2, id);
            executeInsert(statement);
            connection.commit();
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    @Override
    public void updateCapacityById(int id, int capacity) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE taxis SET taxi_capacity=? WHERE taxi_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, capacity);
            statement.setInt(2, id);
            executeInsert(statement);
            connection.commit();
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    private Taxi fetchTaxi(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("taxi_id");
        String name = resultSet.getString("taxi_name");
        int capacity = resultSet.getInt("taxi_capacity");
        return new Taxi(id, name, capacity);
    }
}
