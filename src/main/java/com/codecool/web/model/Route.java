package com.codecool.web.model;

import java.time.LocalDate;
import java.util.Objects;

public final class Route extends AbstractModel {

    private int taxiId;
    private String origin;
    private String destination;
    private LocalDate date;
    private int start;
    private int end;
    private int price;

    public Route(int id, int taxiId, String routeOrigin, String routeDestination, LocalDate routeDate, int routeStart, int routeEnd, int routePrice) {
        super(id);
        this.taxiId = taxiId;
        this.origin = routeOrigin;
        this.destination = routeDestination;
        this.date = routeDate;
        this.start = routeStart;
        this.end = routeEnd;
        this.price = routePrice;
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

    public LocalDate getDate() {
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
