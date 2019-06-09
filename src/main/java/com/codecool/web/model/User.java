package com.codecool.web.model;

import java.util.Objects;

public final class User extends AbstractModel {

    private String name;
    private String email;
    private String password;
    private Role role;
    private int balance;

    public User(int id, String userName, String userEmail, String userPassword, Role userRole, int userBalance) {
        super(id);
        this.name = userName;
        this.email = userEmail;
        this.password = userPassword;
        this.role = userRole;
        this.balance = userBalance;
    }

    public User() {
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public int getBalance() {
        return balance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return balance == user.balance &&
            Objects.equals(name, user.name) &&
            Objects.equals(email, user.email) &&
            Objects.equals(password, user.password) &&
            role == user.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, email, password, role, balance);
    }
}
