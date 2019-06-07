package com.codecool.web.service.simple;

import com.codecool.web.dao.UserDao;
import com.codecool.web.model.Role;
import com.codecool.web.model.User;
import com.codecool.web.service.UserService;
import com.codecool.web.service.exception.ServiceException;

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
    public User findById(int id) throws SQLException {
        return userDao.findById(id);
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
    public void updateEmailById(int id, String email) throws SQLException {
        userDao.updateEmailById(id, email);
    }

    @Override
    public void updatePasswordById(int id, String password) throws SQLException {
        userDao.updateEmailById(id, password);
    }

    @Override
    public void deleteById(int id) throws SQLException {
        userDao.deleteById(id);
    }

    @Override
    public void subtractFromBalanceById(int id, int price) throws SQLException {
        userDao.subtractFromBalanceById(id, price);
    }

    @Override
    public void addToBalanceById(int id, int deposit) throws SQLException {
        userDao.addToBalanceById(id, deposit);
    }

    @Override
    public User loginUser(String email, String password) throws SQLException, ServiceException {
        try {
            User user = userDao.findByEmail(email);
            if (user == null || !user.getUserPassword().equals(password)) {
                throw new ServiceException("Bad login");
            }
            return user;
        } catch (IllegalArgumentException ex) {
            throw new ServiceException(ex.getMessage());
        }
    }
}
