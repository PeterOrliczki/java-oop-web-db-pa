package com.codecool.web.model;

import java.util.Objects;

public final class Plane extends AbstractModel {

    private String name;
    private int capacity;

    public Plane(int id, String name, int capacity) {
        super(id);
        this.name = name;
        this.capacity = capacity;
    }

    public Plane() {
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
        Plane plane = (Plane) o;
        return capacity == plane.capacity &&
            Objects.equals(name, plane.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, capacity);
    }
}
