package com.codecool.web.model;

import java.util.Objects;

public final class Plane extends AbstractModel {

    private String planeName;
    private int planeCapacity;

    public Plane(int id, String planeName, int planeCapacity) {
        super(id);
        this.planeName = planeName;
        this.planeCapacity = planeCapacity;
    }

    public Plane() {
    }

    public String getPlaneName() {
        return planeName;
    }

    public int getPlaneCapacity() {
        return planeCapacity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Plane plane = (Plane) o;
        return planeCapacity == plane.planeCapacity &&
            Objects.equals(planeName, plane.planeName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), planeName, planeCapacity);
    }
}
