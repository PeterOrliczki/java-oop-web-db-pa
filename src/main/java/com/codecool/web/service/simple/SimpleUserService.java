package com.codecool.web.service.simple;

import com.codecool.web.dao.UserDao;
import com.codecool.web.model.Activity;
import com.codecool.web.model.Role;
import com.codecool.web.model.User;
import com.codecool.web.service.UserService;

import java.sql.SQLException;
import java.util.List;

public final class SimpleUserService implements UserService {

    private final UserDao userDao;

    public SimpleUserService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> findAll() throws SQLException {
        return userDao.findAll();
    }

    @Override
    public User findUserById(int id) throws SQLException {
        return userDao.findUserById(id);
    }

    @Override
    public User findByName(String name) throws SQLException {
        return userDao.findByName(name);
    }

    @Override
    public User findByEmail(String email) throws SQLException {
        return userDao.findByEmail(email);
    }

    @Override
    public User findByRole(Role role) throws SQLException {
        return userDao.findByRole(role);
    }

    @Override
    public boolean findIfUserExists(String email) throws SQLException {
        return userDao.findIfUserExists(email);
    }

    @Override
    public User addUser(String name, String email, String password, Role role, int balance) throws SQLException {
        return userDao.addUser(name, email, password, role, balance);
    }

    @Override
    public void updateUserEmailById(int id, String email) throws SQLException {
        userDao.updateUserEmailById(id, email);
    }

    @Override
    public void updateUserPasswordById(int id, String password) throws SQLException {
        userDao.updateUserEmailById(id, password);
    }

    @Override
    public void deleteUserById(int id) throws SQLException {
        userDao.deleteUserById(id);
    }

    @Override
    public List<Activity> findAllActivity() throws SQLException {
        return userDao.findAllActivity();
    }
}
