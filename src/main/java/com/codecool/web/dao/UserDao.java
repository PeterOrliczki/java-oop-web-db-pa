package com.codecool.web.dao;

import com.codecool.web.model.Role;
import com.codecool.web.model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {

    List<User> findAll() throws SQLException;

    User findById(int id) throws SQLException;

    User findByEmail(String email) throws SQLException;

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
}
