package com.codecool.web.service.simple;

import com.codecool.web.dao.ActivityDao;
import com.codecool.web.model.Activity;
import com.codecool.web.service.ActivityService;

import java.sql.SQLException;
import java.util.List;

public final class SimpleActivityService implements ActivityService {

    private final ActivityDao activityDao;

    public SimpleActivityService(ActivityDao activityDao) {
        this.activityDao = activityDao;
    }

    @Override
    public List<Activity> findAllActivity() throws SQLException {
        return activityDao.findAllActivity();
    }
}
