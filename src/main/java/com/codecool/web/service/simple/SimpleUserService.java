package com.codecool.web.service.simple;

import com.codecool.web.dao.UserDao;
import com.codecool.web.model.Role;
import com.codecool.web.model.User;
import com.codecool.web.service.PasswordService;
import com.codecool.web.service.UserService;
import com.codecool.web.service.exception.ServiceException;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
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
    public boolean findIfUserExists(String email) throws SQLException {
        return userDao.findIfUserExists(email);
    }

    @Override
    public boolean findIfUserIdExistsInUsersFlights(int id) throws SQLException {
        return userDao.findIfUserIdExistsInUsersFlights(id);
    }

    @Override
    public boolean findIfUserIdExistsInUsersRoutes(int id) throws SQLException {
        return userDao.findIfUserIdExistsInUsersRoutes(id);
    }

    @Override
    public User addUser(String name, String email, String password, Role role, int balance) throws SQLException {
        return userDao.addUser(name, email, password, role, balance);
    }

    @Override
    public void updateNameById(int id, String name) throws SQLException {
        userDao.updateNameById(id, name);
    }

    @Override
    public void updateEmailById(int id, String email) throws SQLException {
        userDao.updateEmailById(id, email);
    }

    @Override
    public void updatePasswordById(int id, String password) throws SQLException {
        userDao.updatePasswordById(id, password);
    }

    @Override
    public void deleteById(int id) throws SQLException {
        userDao.deleteById(id);
    }

    @Override
    public void deleteFromUsersFlightsById(int id) throws SQLException {
        userDao.deleteFromUsersFlightsById(id);
    }

    @Override
    public void deleteFromUsersRoutesById(int id) throws SQLException {
        userDao.deleteFromUsersRoutesById(id);
    }

    @Override
    public void addToBalanceById(int id, int deposit) throws SQLException {
        userDao.addToBalanceById(id, deposit);
    }

    @Override
    public User loginUser(String email, String password) throws SQLException, ServiceException {
        PasswordService passwordService = new PasswordService();
        if (email.equals("Guest")) {
            return new User(0, "Guest", "Guest", "Guest", Role.UNREGISTERED, 0);
        } else {
            try {
                User user = userDao.findByEmail(email);
                if (user == null || !passwordService.validatePassword(password, user.getPassword())) {
                    throw new ServiceException("Bad login");
                }
                return user;
            } catch (IllegalArgumentException | NoSuchAlgorithmException | InvalidKeySpecException ex) {
                throw new ServiceException(ex.getMessage());
            }
        }
    }
}
