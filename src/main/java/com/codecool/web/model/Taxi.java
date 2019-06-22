package com.codecool.web.model;

import java.util.Objects;

public final class Taxi extends AbstractModel {

    private String name;
    private String licensePlate;
    private int capacity;

    public Taxi(int id, String taxiName, String taxiLicensePlate, int taxiCapacity) {
        super(id);
        this.name = taxiName;
        this.licensePlate = taxiLicensePlate;
        this.capacity = taxiCapacity;
    }

    public Taxi() {
    }

    public String getName() {
        return name;
    }

    public String getLicensePlate() {
        return licensePlate;
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
            Objects.equals(name, taxi.name) &&
            Objects.equals(licensePlate, taxi.licensePlate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, licensePlate, capacity);
    }
}
