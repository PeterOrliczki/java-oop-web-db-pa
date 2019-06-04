package com.codecool.web.model;

public enum Role {
    UNREGISTERED("unregistered"),
    REGISTERED("registered"),
    ADMIN("admin");

    private final String value;

    private Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
