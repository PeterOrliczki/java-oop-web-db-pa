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
    public Taxi findById(int id) throws SQLException {
        String sql = "SELECT * FROM taxis WHERE taxi_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchTaxi(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Taxi findByName(String name) throws SQLException {
        String sql = "SELECT * FROM taxis WHERE taxi_name=? ORDER BY plane_name";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, name);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchTaxi(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Taxi findByLicensePlate(String licensePlate) throws SQLException {
        String sql = "SELECT * FROM taxis WHERE taxi_license_plate=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, licensePlate);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchTaxi(resultSet);
                }
            }
        }
        return null;
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
    public boolean findIfTaxiExistsByName(String name) throws SQLException {
        List<Taxi> taxis = new ArrayList<>();
        String sql = "SELECT * FROM taxis WHERE taxi_name=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, name);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public Taxi addTaxi(String name, String licensePlate, int capacity) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO taxis(taxi_name, taxi_license_plate, taxi_capacity) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, name);
            statement.setString(2, licensePlate);
            statement.setInt(3, capacity);
            executeInsert(statement);
            int id = fetchGeneratedId(statement);
            connection.commit();
            return new Taxi(id, name, licensePlate, capacity);
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
    public void updateLicensePlateById(int id, String licensePlate) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE taxis SET taxi_license_plate=? WHERE taxi_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, licensePlate);
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

    @Override
    public void deleteById(int id) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "DELETE FROM taxis WHERE taxi_id=?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setInt(1, id);
            preparedStatement.executeUpdate();
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
        String licensePlate = resultSet.getString("taxi_license_plate");
        int capacity = resultSet.getInt("taxi_capacity");
        return new Taxi(id, name, licensePlate, capacity);
    }
}
