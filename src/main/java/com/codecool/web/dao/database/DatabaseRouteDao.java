package com.codecool.web.dao.database;

import com.codecool.web.dao.RouteDao;
import com.codecool.web.model.Route;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class DatabaseRouteDao extends AbstractDao implements RouteDao {

    public DatabaseRouteDao(Connection connection) {
        super(connection);
    }

    @Override
    public List<Route> findAll() throws SQLException {
        String sql = "SELECT * FROM routes";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            List<Route> routes = new ArrayList<>();
            while (resultSet.next()) {
                routes.add(fetchRoute(resultSet));
            }
            return routes;
        }
    }

    @Override
    public Route addRoute(int taxiId, String origin, String destination, String date, int start, int end, int price) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO routes(taxi_id, route_origin, route_destination, route_date, route_start, route_end, route_price) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, taxiId);
            statement.setString(2, origin);
            statement.setString(3, destination);
            statement.setString(4, date);
            statement.setInt(5, start);
            statement.setInt(6, end);
            statement.setInt(7, price);
            executeInsert(statement);
            int id = fetchGeneratedId(statement);
            connection.commit();
            return new Route(id, taxiId, origin, destination, date, start, end, price);
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    @Override
    public void updateTaxiIdById(int id, int taxiId) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET taxi_id=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, taxiId);
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
    public void updateOriginById(int id, String origin) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET route_origin=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, origin);
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
    public void updateDestinationById(int id, String destination) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET route_destination=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, destination);
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
    public void updateDateById(int id, String date) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET route_date=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, date);
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
    public void updateStartById(int id, int start) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET route_start=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, start);
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
    public void updateEndById(int id, int end) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET route_end=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, end);
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
    public void updatePriceById(int id, int price) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET route_price=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, price);
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
    public void orderRoute(int userId, int routeId) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO users_routes(user_id, route_id) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, userId);
            statement.setInt(2, routeId);
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
    public List<Route> findAllOrders(int userId) throws SQLException {
        List<Route> routes = new ArrayList<>();
        String sql = "SELECT * FROM users_routes JOIN routes ON users_routes.route_id = routes.route_id WHERE users_routes.user_id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    routes.add(fetchRoute(resultSet));
                }
            }
        }
        return routes;
    }

    private Route fetchRoute(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("route_id");
        int taxiId = resultSet.getInt("taxi_id");
        String origin = resultSet.getString("route_origin");
        String destination = resultSet.getString("route_destination");
        String date = resultSet.getString("route_date");
        int start = resultSet.getInt("route_start");
        int end = resultSet.getInt("route_end");
        int price = resultSet.getInt("route_price");
        return new Route(id, taxiId, origin, destination, date, start, end, price);
    }
}
