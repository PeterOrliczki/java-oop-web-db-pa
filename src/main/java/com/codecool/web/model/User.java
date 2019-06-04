package com.codecool.web.model;

import java.util.Objects;

public final class User extends AbstractModel {

    private String userName;
    private String userEmail;
    private String userPassword;
    private Role userRole;
    private int userBalance;

    public User(int id, String userName, String userEmail, String userPassword, Role userRole, int userBalance) {
        super(id);
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userRole = userRole;
        this.userBalance = userBalance;
    }

    public User() {
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public Role getUserRole() {
        return userRole;
    }

    public int getUserBalance() {
        return userBalance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return userBalance == user.userBalance &&
            Objects.equals(userName, user.userName) &&
            Objects.equals(userEmail, user.userEmail) &&
            Objects.equals(userPassword, user.userPassword) &&
            userRole == user.userRole;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), userName, userEmail, userPassword, userRole, userBalance);
    }
}
