package com.codecool.web.dao.database;

import com.codecool.web.dao.FlightDao;
import com.codecool.web.model.Flight;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class DatabaseFlightDao extends AbstractDao implements FlightDao {

    public DatabaseFlightDao(Connection connection) {
        super(connection);
    }

    @Override
    public List<Flight> findAll() throws SQLException {
        String sql = "SELECT * FROM flights";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            List<Flight> flights = new ArrayList<>();
            while (resultSet.next()) {
                flights.add(fetchFlight(resultSet));
            }
            return flights;
        }
    }

    @Override
    public Flight addFlight(int planeId, String origin, String destination, String date, int start, int end, String flightClass, int price) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO flights(plane_id, flight_origin, flight_destination, flight_date, flight_start, flight_end, flight_class, flight_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, planeId);
            statement.setString(2, origin);
            statement.setString(3, destination);
            statement.setString(4, date);
            statement.setInt(5, start);
            statement.setInt(6, end);
            statement.setString(7, flightClass);
            statement.setInt(8, price);
            executeInsert(statement);
            int id = fetchGeneratedId(statement);
            connection.commit();
            return new Flight(id, planeId, origin, destination, date, start, end, flightClass, price);
        } catch (SQLException ex) {
            connection.rollback();
            throw ex;
        } finally {
            connection.setAutoCommit(autoCommit);
        }
    }

    @Override
    public void updatePlaneIdById(int id, int planeId) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE flights SET plane_id=? WHERE flight_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, planeId);
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
        String sql = "UPDATE flights SET flight_origin=? WHERE flight_id=?";
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
        String sql = "UPDATE flights SET flight_destination=? WHERE flight_id=?";
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
        String sql = "UPDATE flights SET flight_date=? WHERE flight_id=?";
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
        String sql = "UPDATE flights SET flight_start=? WHERE flight_id=?";
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
        String sql = "UPDATE flights SET flight_end=? WHERE flight_id=?";
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
    public void updateClassById(int id, String flightClass) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE flights SET flight_class=? WHERE flight_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, flightClass);
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
        String sql = "UPDATE flights SET flight_price=? WHERE flight_id=?";
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
    public void orderFlight(int userId, int flightId) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO users_flights(user_id, flight_id) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, userId);
            statement.setInt(2, flightId);
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
    public List<Flight> findAllOrders(int userId) throws SQLException {
        List<Flight> orders = new ArrayList<>();
        String sql = "SELECT * FROM users_flights JOIN flights ON users_flights.flight_id = flights.flight_id WHERE users_flights.user_id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    orders.add(fetchFlight(resultSet));
                }
            }
        }
        return orders;
    }

    private Flight fetchFlight(ResultSet resultSet) throws SQLException {
        int id = resultSet.getInt("flight_id");
        int planeId = resultSet.getInt("plane_id");
        String origin = resultSet.getString("flight_origin");
        String destination = resultSet.getString("flight_destination");
        String date = resultSet.getString("flight_date");
        int start = resultSet.getInt("flight_start");
        int end = resultSet.getInt("flight_end");
        String flightClass = resultSet.getString("flight_class");
        int price = resultSet.getInt("flight_price");
        return new Flight(id, planeId, origin, destination, date, start, end, flightClass, price);
    }
}
