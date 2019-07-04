package com.codecool.web.model;

import java.util.Objects;

public final class Taxi extends AbstractModel {

    private String name;
    private int capacity;

    public Taxi(int id, String name, int capacity) {
        super(id);
        this.name = name;
        this.capacity = capacity;
    }

    public Taxi() {
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Taxi taxi = (Taxi) o;
        return capacity == taxi.capacity &&
            Objects.equals(name, taxi.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, capacity);
    }
}
