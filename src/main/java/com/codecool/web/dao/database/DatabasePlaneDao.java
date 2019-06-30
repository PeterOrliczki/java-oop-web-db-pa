package com.codecool.web.dao.database;

import com.codecool.web.dao.PlaneDao;
import com.codecool.web.model.Plane;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class DatabasePlaneDao extends AbstractDao implements PlaneDao {

    public DatabasePlaneDao(Connection connection) {
        super(connection);
    }

    @Override
    public List<Plane> findAll() throws SQLException {
        String sql = "SELECT * FROM planes";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            List<Plane> planes = new ArrayList<>();
            while (resultSet.next()) {
                planes.add(fetchPlane(resultSet));
            }
            return planes;
        }
    }

    @Override
    public Plane findById(int id) throws SQLException {
        String sql = "SELECT * FROM planes WHERE plane_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchPlane(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Plane findByName(String name) throws SQLException {
        String sql = "SELECT * FROM planes WHERE plane_name=? ORDER BY plane_name";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, name);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchPlane(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public boolean findIfPlaneExists(int id) throws SQLException {
        List<Plane> planes = new ArrayList<>();
        String sql = "SELECT * FROM planes WHERE plane_id=?";
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
    public boolean findIfPlaneExistsByName(String name) throws SQLException {
        List<Plane> planes = new ArrayList<>();
        String sql = "SELECT * FROM planes WHERE plane_name=?";
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
    public Plane addPlane(String name, int capacity) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO planes(plane_name, plane_capacity) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, name);
            statement.setInt(2, capacity);
            executeInsert(statement);
            int id = fetchGeneratedId(statement);
            connection.commit();
            return new Plane(id, name, capacity);
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
        String sql = "UPDATE planes SET plane_name=? WHERE plane_id=?";
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
        String sql = "UPDATE planes SET plane_capacity=? WHERE plane_id=?";
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
        String sql = "DELETE FROM planes WHERE plane_id=?";
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

    private Plane fetchPlane(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("plane_id");
        String name = resultSet.getString("plane_name");
        int capacity = resultSet.getInt("plane_capacity");
        return new Plane(id, name, capacity);
    }
}
