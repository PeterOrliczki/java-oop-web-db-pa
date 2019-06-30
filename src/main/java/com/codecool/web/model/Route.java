package com.codecool.web.model;

import java.util.Objects;

public final class Route extends AbstractModel {

    private int taxiId;
    private String origin;
    private String destination;
    private String date;
    private int start;
    private int end;
    private int price;

    public Route(int id, int taxiId, String origin, String destination, String date, int start, int end, int price) {
        super(id);
        this.taxiId = taxiId;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.start = start;
        this.end = end;
        this.price = price;
    }

    public Route() {
    }

    public int getTaxiId() {
        return taxiId;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }

    public String getDate() {
        return date;
    }

    public int getStart() {
        return start;
    }

    public int getEnd() {
        return end;
    }

    public int getPrice() {
        return price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Route route = (Route) o;
        return taxiId == route.taxiId &&
            start == route.start &&
            end == route.end &&
            price == route.price &&
            Objects.equals(origin, route.origin) &&
            Objects.equals(destination, route.destination) &&
            Objects.equals(date, route.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), taxiId, origin, destination, date, start, end, price);
    }
}
