package com.codecool.web.model;

import java.time.LocalDate;
import java.util.Objects;

public final class Route extends AbstractModel {

    private int taxiId;
    private String routeOrigin;
    private String routeDestination;
    private LocalDate routeDate;
    private int routeStart;
    private int routeEnd;
    private int routePrice;

    public Route(int id, int taxiId, String routeOrigin, String routeDestination, LocalDate routeDate, int routeStart, int routeEnd, int routePrice) {
        super(id);
        this.taxiId = taxiId;
        this.routeOrigin = routeOrigin;
        this.routeDestination = routeDestination;
        this.routeDate = routeDate;
        this.routeStart = routeStart;
        this.routeEnd = routeEnd;
        this.routePrice = routePrice;
    }

    public Route() {
    }

    public int getTaxiId() {
        return taxiId;
    }

    public String getRouteOrigin() {
        return routeOrigin;
    }

    public String getRouteDestination() {
        return routeDestination;
    }

    public LocalDate getRouteDate() {
        return routeDate;
    }

    public int getRouteStart() {
        return routeStart;
    }

    public int getRouteEnd() {
        return routeEnd;
    }

    public int getRoutePrice() {
        return routePrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Route route = (Route) o;
        return taxiId == route.taxiId &&
            routeStart == route.routeStart &&
            routeEnd == route.routeEnd &&
            routePrice == route.routePrice &&
            Objects.equals(routeOrigin, route.routeOrigin) &&
            Objects.equals(routeDestination, route.routeDestination) &&
            Objects.equals(routeDate, route.routeDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), taxiId, routeOrigin, routeDestination, routeDate, routeStart, routeEnd, routePrice);
    }
}
