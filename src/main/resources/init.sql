DROP TABLE IF EXISTS users_flights CASCADE;
DROP TABLE IF EXISTS users_routes CASCADE;
DROP TABLE IF EXISTS flights CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS planes CASCADE;
DROP TABLE IF EXISTS taxis CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS audit CASCADE;
DROP SEQUENCE IF EXISTS counter CASCADE;

CREATE TABLE users(
	user_id SERIAL UNIQUE PRIMARY KEY,
	user_name varchar(16) NOT NULL,
	user_email varchar(254) NOT NULL,
	user_password text NOT NULL,
	user_role varchar(12) NOT NULL,
	user_balance integer NOT NULL,
	CONSTRAINT user_name_not_empty CHECK (user_name <> ''),
	CONSTRAINT user_email_not_empty CHECK (user_email <> ''),
	CONSTRAINT user_password_not_empty CHECK (user_password <> ''),
	CONSTRAINT user_role_not_empty CHECK (user_role <> '')
);

CREATE TABLE planes(
	plane_id SERIAL UNIQUE PRIMARY KEY,
	plane_name varchar(100) NOT NULL,
    plane_capacity integer NOT NULL
);

CREATE TABLE taxis(
	taxi_id SERIAL UNIQUE PRIMARY KEY,
	taxi_name varchar(100) NOT NULL,
	taxi_license_plate varchar(100) NOT NULL,
    taxi_capacity integer NOT NULL
);

CREATE TABLE flights(
	flight_id SERIAL UNIQUE PRIMARY KEY,
	plane_id integer,
	flight_origin varchar(100) NOT NULL,
    flight_destination varchar(100) NOT NULL,
    flight_date date NOT NULL,
    flight_start integer NOT NULL,
    flight_end integer NOT NULL,
    flight_class varchar(32) NOT NULL,
    flight_price integer NOT NULL,
    FOREIGN KEY(plane_id) REFERENCES planes(plane_id),
	CONSTRAINT flight_start_borders CHECK (flight_start > 0 AND flight_start <= 24),
    CONSTRAINT flight_end_borders CHECK (flight_end > 0 AND flight_end <= 24)
);

CREATE TABLE routes(
	route_id SERIAL UNIQUE PRIMARY KEY,
	taxi_id integer,
	route_origin varchar(100) NOT NULL,
    route_destination varchar(100) NOT NULL,
    route_date date NOT NULL,
    route_start integer NOT NULL,
    route_end integer NOT NULL,
    route_price integer NOT NULL,
    FOREIGN KEY(taxi_id) REFERENCES taxis(taxi_id),
	CONSTRAINT route_start_borders CHECK (route_start > 0 AND route_start <= 24),
    CONSTRAINT route_end_borders CHECK (route_end > 0 AND route_end <= 24)
);

CREATE TABLE users_flights(
	user_id integer,
	flight_id integer,
	FOREIGN KEY(user_id) REFERENCES users(user_id),
	FOREIGN KEY(flight_id) REFERENCES flights(flight_id),
	UNIQUE (user_id, flight_id)
);

CREATE TABLE users_routes(
	user_id integer,
	route_id integer,
	FOREIGN KEY(user_id) REFERENCES users(user_id),
	FOREIGN KEY(route_id) REFERENCES routes(route_id),
	UNIQUE (user_id, route_id)
);

CREATE TABLE audit(
	event_counter integer UNIQUE PRIMARY KEY,
	event_name varchar(100),
	table_name varchar(100),
	user_id integer,
	event_date timestamp
);

CREATE SEQUENCE counter AS integer INCREMENT BY 1 START 1;

CREATE OR REPLACE FUNCTION process_audit() RETURNS TRIGGER AS '
    BEGIN
        IF (TG_OP = ''DELETE'') THEN
            INSERT INTO audit
                VALUES(nextval(''counter''),''DELETE'', TG_TABLE_NAME, OLD.user_id, now());
        ELSIF (TG_OP = ''UPDATE'') THEN
            INSERT INTO audit
                VALUES(nextval(''counter''), ''UPDATE'', TG_TABLE_NAME, OLD.user_id, now());
        ELSIF (TG_OP = ''INSERT'') THEN
            INSERT INTO audit
                VALUES(nextval(''counter''), ''INSERT'', TG_TABLE_NAME, NEW.user_id, now());
        END IF;
        RETURN NEW;
    END;
' LANGUAGE plpgsql;

CREATE TRIGGER users_audit_insert
    AFTER INSERT ON users
    FOR EACH ROW EXECUTE PROCEDURE process_audit();
CREATE TRIGGER users_audit_update
    AFTER UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE process_audit();
CREATE TRIGGER users_audit_delete
    AFTER DELETE ON users
    FOR EACH ROW EXECUTE PROCEDURE process_audit();

CREATE TRIGGER users_flights_audit_insert
    AFTER INSERT ON users_flights
    FOR EACH ROW EXECUTE PROCEDURE process_audit();
CREATE TRIGGER users_flights_audit_update
    AFTER UPDATE ON users_flights
    FOR EACH ROW EXECUTE PROCEDURE process_audit();
CREATE TRIGGER users_flights_audit_delete
    AFTER DELETE ON users_flights
    FOR EACH ROW EXECUTE PROCEDURE process_audit();

CREATE TRIGGER users_routes_audit_insert
    AFTER INSERT ON users_routes
    FOR EACH ROW EXECUTE PROCEDURE process_audit();
CREATE TRIGGER users_routes_audit_update
    AFTER UPDATE ON users_routes
    FOR EACH ROW EXECUTE PROCEDURE process_audit();
CREATE TRIGGER users_routes_audit_delete
    AFTER DELETE ON users_routes
    FOR EACH ROW EXECUTE PROCEDURE process_audit();


INSERT INTO users(user_name, user_email, user_password, user_role, user_balance) VALUES ('admin', 'admin', 'ADMIN', 'admin', 1000);

INSERT INTO planes(plane_name, plane_capacity) VALUES ('Boeing 737', 162);

INSERT INTO flights(plane_id, flight_origin, flight_destination, flight_date, flight_start, flight_end, flight_class, flight_price) VALUES (1, 'Hungary', 'Spain', '2001-09-28', 1, 2, 'Economy', 123);

INSERT INTO users_flights(user_id, flight_id) VALUES
        (1, 1);

INSERT INTO taxis(taxi_name, taxi_license_plate, taxi_capacity) VALUES ('Skoda Octavia', 'abc-123', 3);

INSERT INTO routes(taxi_id, route_origin, route_destination, route_date, route_start, route_end, route_price) VALUES (1, 'Hungary 1111 A st. 1.', 'Hungary 2222 B st. 2.', '2001-09-28', 2, 3, 30);

INSERT INTO users_routes(user_id, route_id) VALUES
        (1, 1);










