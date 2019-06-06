package com.codecool.web.dao.database;

import com.codecool.web.dao.FlightDao;
import com.codecool.web.model.Flight;

import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    public Flight findFlightById(int id) throws SQLException {
        String sql = "SELECT * FROM flights WHERE flight_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findFlightByPlaneId(int id) throws SQLException {
        String sql = "SELECT * FROM flights WHERE plane_id=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findByOrigin(String origin) throws SQLException {
        String sql = "SELECT * FROM flights WHERE flight_origin=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, origin);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findByDestination(String destination) throws SQLException {
        String sql = "SELECT * FROM flights WHERE flight_destination=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, destination);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findByDate(LocalDate date) throws SQLException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        String sql = "SELECT * FROM flights WHERE flight_date=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, date.format(formatter));
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findByStart(int start) throws SQLException {
        String sql = "SELECT * FROM flights WHERE flight_start=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, start);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findByEnd(int end) throws SQLException {
        String sql = "SELECT * FROM flights WHERE flight_end=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, end);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findByClass(String flightClass) throws SQLException {
        String sql = "SELECT * FROM flights WHERE flight_class=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, flightClass);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight findByPrice(int price) throws SQLException {
        String sql = "SELECT * FROM flights WHERE flight_price=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, price);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return fetchFlight(resultSet);
                }
            }
        }
        return null;
    }

    @Override
    public Flight addFlight(int planeId, String flightOrigin, String flightDestination, LocalDate flightDate, int flightStart, int flightEnd, String flightClass, int flightPrice) throws SQLException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "INSERT INTO flights(plane_id, flight_origin, flight_destination, flight_date, flight_start, flight_end, flight_class, flight_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, planeId);
            statement.setString(2, flightOrigin);
            statement.setString(3, flightDestination);
            statement.setString(4, flightDate.format(formatter));
            statement.setInt(5, flightStart);
            statement.setInt(6, flightEnd);
            statement.setString(7, flightClass);
            statement.setInt(8, flightPrice);
            executeInsert(statement);
            int id = fetchGeneratedId(statement);
            connection.commit();
            return new Flight(id, planeId, flightOrigin, flightDestination, flightDate, flightStart, flightEnd, flightClass, flightPrice);
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
    public void updateDateById(int id, LocalDate date) throws SQLException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "UPDATE flights SET flight_date=? WHERE flight_id=?";
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
    public void deleteFlightById(int id) throws SQLException {
        boolean autoCommit = connection.getAutoCommit();
        connection.setAutoCommit(false);
        String sql = "DELETE FROM flights WHERE flight_id=?";
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

    private Flight fetchFlight(ResultSet resultSet) throws SQLException {
        int flightId = resultSet.getInt("flight_id");
        int planeId = resultSet.getInt("plane_id");
        String flightOrigin = resultSet.getString("flight_origin");
        String flightDestination = resultSet.getString("flight_destination");
        LocalDate flightDate = resultSet.getDate("flight_date").toLocalDate();
        int flightStart = resultSet.getInt("flight_start");
        int flightEnd = resultSet.getInt("flight_end");
        String flightClass = resultSet.getString("flight_class");
        int flightPrice = resultSet.getInt("flight_price");
        return new Flight(flightId, planeId, flightOrigin, flightDestination, flightDate, flightStart, flightEnd, flightClass, flightPrice);
    }
}
