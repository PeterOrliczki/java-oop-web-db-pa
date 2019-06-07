package com.codecool.web.service;

import com.codecool.web.model.Role;
import com.codecool.web.model.User;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public interface UserService {

    List<User> findAll() throws SQLException;

    User findById(int id) throws SQLException;

    User findByName(String name) throws SQLException;

    User findByEmail(String email) throws SQLException;

    User findByRole(Role role) throws SQLException;

    boolean findIfUserExists(String email) throws SQLException;

    User addUser(String name, String email, String password, Role role, int balance) throws SQLException;

    void updateEmailById(int id, String email) throws SQLException;

    void updatePasswordById(int id, String password) throws SQLException;

    void deleteById(int id) throws SQLException;

    void subtractFromBalanceById(int id, int price) throws SQLException;

    void addToBalanceById(int id, int deposit) throws SQLException;

    User loginUser(String email, String password) throws SQLException, ServiceException;
}
