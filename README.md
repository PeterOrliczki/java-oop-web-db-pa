# About

Plane Ticket and Taxi Cab Fare Buyer is a Maven managed dynamic web-application.

# DataSource

Before deploying to a webserver create a `Resource` like in your webserver's config (e.g. for Apache Tomcat in `conf/context.xml`).

```
<Resource name="jdbc/javaOopWebDbPa"
          type="javax.sql.DataSource"
          username="postgres"
          password="admin"
          driverClassName="org.postgresql.Driver"
          url="jdbc:postgresql://localhost:5432/java-oop-web-db-pa"
          closeMethod="close"/>
```

*Note*: the `closeMethod="close"` attribute is important. [As per Tomcat's documentation][1] this ensures that connections retrieved from the datasource are closed properly when a webapp context is reloaded/restarted/redeployed/etc.

[1]: https://tomcat.apache.org/tomcat-9.0-doc/config/context.html#Resource_Definitions

# Backlog

To see this project's backlog, click [here][2].

[2]: https://docs.google.com/document/d/1G2wGg5WStVVtnwZdlsz-de7snsj4-_NdPEA2M5mOgoE/edit

# Users

There are 2 users already existing in the application, the `username`, `email` and `password` fields for these are the following: <br>
a, a, a -> ADMIN user, with the balance of 0. <br>
r, r, r -> REGISTERED user, with the initial balance of 1000.
