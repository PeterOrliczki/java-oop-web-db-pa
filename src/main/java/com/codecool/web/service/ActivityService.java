package com.codecool.web.service;

import com.codecool.web.model.Activity;

import java.sql.SQLException;
import java.util.List;

public interface ActivityService {

    List<Activity> findAll() throws SQLException;
}
