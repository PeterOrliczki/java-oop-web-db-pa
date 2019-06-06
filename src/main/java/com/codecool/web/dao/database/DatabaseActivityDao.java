package com.codecool.web.dao.database;

import com.codecool.web.dao.ActivityDao;
import com.codecool.web.model.Activity;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public final class DatabaseActivityDao extends AbstractDao implements ActivityDao {

    public DatabaseActivityDao(Connection connection) {
        super(connection);
    }

    @Override
    public List<Activity> findAllActivity() throws SQLException {
        List<Activity> activities = new ArrayList<>();
        String sql = "SELECT event_name, table_name, event_date, users.user_name FROM audit JOIN users ON audit.user_id = users.user_id";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery((sql))) {
            while (resultSet.next()) {
                activities.add(fetchActivity(resultSet));
            }
        }
        return activities;
    }

    private Activity fetchActivity(ResultSet resultSet) throws SQLException {
        String eventName = resultSet.getString("event_name");
        String tableName = resultSet.getString("table_name");
        String userName = resultSet.getString("user_name");
        String eventDate = resultSet.getString("event_date");

        return new Activity(eventName, tableName, userName, eventDate);
    }
}
