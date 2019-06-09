package com.codecool.web.model;

import java.time.LocalDate;
import java.util.Objects;

public final class Flight extends AbstractModel {

    private int planeId;
    private String origin;
    private String destination;
    private LocalDate date;
    private int start;
    private int end;
    private String flightClass;
    private int price;

    public Flight(int id, int planeId, String flightOrigin, String flightDestination, LocalDate flightDate, int flightStart, int flightEnd, String flightClass, int flightPrice) {
        super(id);
        this.planeId = planeId;
        this.origin = flightOrigin;
        this.destination = flightDestination;
        this.date = flightDate;
        this.start = flightStart;
        this.end = flightEnd;
        this.flightClass = flightClass;
        this.price = flightPrice;
    }

    public Flight() {
    }

    public int getPlaneId() {
        return planeId;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }

    public LocalDate getDate() {
        return date;
    }

    public int getStart() {
        return start;
    }

    public int getEnd() {
        return end;
    }

    public String getFlightClass() {
        return flightClass;
    }

    public int getPrice() {
        return price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Flight flight = (Flight) o;
        return planeId == flight.planeId &&
            start == flight.start &&
            end == flight.end &&
            price == flight.price &&
            Objects.equals(origin, flight.origin) &&
            Objects.equals(destination, flight.destination) &&
            Objects.equals(date, flight.date) &&
            Objects.equals(flightClass, flight.flightClass);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), planeId, origin, destination, date, start, end, flightClass, price);
    }
}
