package com.codecool.web.dao;

import com.codecool.web.model.Activity;

import java.sql.SQLException;
import java.util.List;

public interface ActivityDao {

    List<Activity> findAllActivity() throws SQLException;
}
