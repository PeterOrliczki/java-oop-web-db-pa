package com.codecool.web.model;

import java.util.Objects;

public final class Flight extends AbstractModel {

    private int planeId;
    private String flightOrigin;
    private String flightDestination;
    private String flightDate;
    private int flightStart;
    private int flightEnd;
    private String flightClass;
    private int flightPrice;

    public Flight(int id, int planeId, String flightOrigin, String flightDestination, String flightDate, int flightStart, int flightEnd, String flightClass, int flightPrice) {
        super(id);
        this.planeId = planeId;
        this.flightOrigin = flightOrigin;
        this.flightDestination = flightDestination;
        this.flightDate = flightDate;
        this.flightStart = flightStart;
        this.flightEnd = flightEnd;
        this.flightClass = flightClass;
        this.flightPrice = flightPrice;
    }

    public Flight() {
    }

    public int getPlaneId() {
        return planeId;
    }

    public String getFlightOrigin() {
        return flightOrigin;
    }

    public String getFlightDestination() {
        return flightDestination;
    }

    public String getFlightDate() {
        return flightDate;
    }

    public int getFlightStart() {
        return flightStart;
    }

    public int getFlightEnd() {
        return flightEnd;
    }

    public String getFlightClass() {
        return flightClass;
    }

    public int getFlightPrice() {
        return flightPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Flight flight = (Flight) o;
        return planeId == flight.planeId &&
            flightStart == flight.flightStart &&
            flightEnd == flight.flightEnd &&
            flightPrice == flight.flightPrice &&
            Objects.equals(flightOrigin, flight.flightOrigin) &&
            Objects.equals(flightDestination, flight.flightDestination) &&
            Objects.equals(flightDate, flight.flightDate) &&
            Objects.equals(flightClass, flight.flightClass);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), planeId, flightOrigin, flightDestination, flightDate, flightStart, flightEnd, flightClass, flightPrice);
    }
}
