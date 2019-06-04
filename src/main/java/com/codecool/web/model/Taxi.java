package com.codecool.web.model;

import java.util.Objects;

public final class Taxi extends AbstractModel {

    private String taxiName;
    private String taxiLicensePlate;
    private int taxiCapacity;

    public Taxi(int id, String taxiName, String taxiLicensePlate, int taxiCapacity) {
        super(id);
        this.taxiName = taxiName;
        this.taxiLicensePlate = taxiLicensePlate;
        this.taxiCapacity = taxiCapacity;
    }

    public Taxi() {
    }

    public String getTaxiName() {
        return taxiName;
    }

    public String getTaxiLicensePlate() {
        return taxiLicensePlate;
    }

    public int getTaxiCapacity() {
        return taxiCapacity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Taxi taxi = (Taxi) o;
        return taxiCapacity == taxi.taxiCapacity &&
            Objects.equals(taxiName, taxi.taxiName) &&
            Objects.equals(taxiLicensePlate, taxi.taxiLicensePlate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), taxiName, taxiLicensePlate, taxiCapacity);
    }
}
