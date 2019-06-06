package com.codecool.web.dao.database;

import com.codecool.web.dao.RouteDao;
import com.codecool.web.model.Route;

import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    public Route findRouteById(int id) throws SQLException {
        String sql = "SELECT * FROM routes WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route findRouteByTaxiId(int id) throws SQLException {
        String sql = "SELECT * FROM routes WHERE taxi_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route findByOrigin(String origin) throws SQLException {
        String sql = "SELECT * FROM routes WHERE route_origin=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, origin);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route findByDestination(String destination) throws SQLException {
        String sql = "SELECT * FROM routes WHERE route_destination=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, destination);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route findByDate(LocalDate date) throws SQLException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        String sql = "SELECT * FROM routes WHERE route_date=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, date.format(formatter));
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route findByStart(int start) throws SQLException {
        String sql = "SELECT * FROM routes WHERE route_start=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, start);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route findByEnd(int end) throws SQLException {
        String sql = "SELECT * FROM routes WHERE route_end=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, end);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route findByPrice(int price) throws SQLException {
        String sql = "SELECT * FROM routes WHERE route_price=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, price);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchRoute(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Route addRoute(int taxiId, String routeOrigin, String routeDestination, LocalDate routeDate, int routeStart, int routeEnd, int routePrice) throws SQLException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO routes(taxi_id, route_origin, route_destination, route_date, route_start, route_end, route_price) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, taxiId);
            statement.setString(2, routeOrigin);
            statement.setString(3, routeDestination);
            statement.setString(4, routeDate.format(formatter));
            statement.setInt(5, routeStart);
            statement.setInt(6, routeEnd);
            statement.setInt(7, routePrice);
            executeInsert(statement);
            int id = fetchGeneratedId(statement);
            connection.commit();
            return new Route(id, taxiId, routeOrigin, routeDestination, routeDate, routeStart, routeEnd, routePrice);
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
    public void updateDateById(int id, LocalDate date) throws SQLException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE routes SET route_date=? WHERE route_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, date.format(formatter));
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
    public void deleteRouteById(int id) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "DELETE FROM routes WHERE route_id=?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setInt(1, id);
            executeInsert(preparedStatement);
            connection.commit();
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    private Route fetchRoute(ResultSet resultSet) throws SQLException {
        int routeId = resultSet.getInt("route_id");
        int taxiId = resultSet.getInt("taxi_id");
        String routeOrigin = resultSet.getString("route_origin");
        String routeDestination = resultSet.getString("route_destination");
        LocalDate routeDate = resultSet.getDate("route_date").toLocalDate();
        int routeStart = resultSet.getInt("route_start");
        int routeEnd = resultSet.getInt("route_end");
        int routePrice = resultSet.getInt("route_price");
        return new Route(routeId, taxiId, routeOrigin, routeDestination, routeDate, routeStart, routeEnd, routePrice);
    }
}
