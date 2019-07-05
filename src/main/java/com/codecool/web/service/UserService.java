package com.codecool.web.service;

import com.codecool.web.model.Role;
import com.codecool.web.model.User;
import com.codecool.web.service.exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public interface UserService {

    List<User> findAll() throws SQLException;

    User findById(int id) throws SQLException;

    boolean findIfUserExists(String email) throws SQLException;

    boolean findIfUserIdExistsInUsersFlights(int id) throws SQLException;

    boolean findIfUserIdExistsInUsersRoutes(int id) throws SQLException;

    User addUser(String name, String email, String password, Role role, int balance) throws SQLException;

    void updateNameById(int id, String name) throws SQLException;

    void updateEmailById(int id, String email) throws SQLException;

    void updatePasswordById(int id, String password) throws SQLException;

    void deleteById(int id) throws SQLException;

    void deleteFromUsersFlightsById(int id) throws SQLException;

    void deleteFromUsersRoutesById(int id) throws SQLException;

    void addToBalanceById(int id, int deposit) throws SQLException;

    User loginUser(String email, String password) throws SQLException, ServiceException;
}
