-- =========================================
-- ADMINS
-- =========================================
CREATE TABLE admins (
    id           TEXT PRIMARY KEY, -- Server-generated user ID
    phone_number TEXT NOT NULL UNIQUE,
    username     TEXT NOT NULL,
    email        TEXT NOT NULL UNIQUE,
    password     TEXT NOT NULL, -- Store a password hash, never plaintext
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- USERS
-- =========================================
CREATE TABLE users (
    id           TEXT PRIMARY KEY, -- Server-generated user ID
    phone_number TEXT NOT NULL UNIQUE,
    username     TEXT,
    email        TEXT NOT NULL UNIQUE,
    password     TEXT NOT NULL, -- Store a password hash, never plaintext
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- BUSES
-- =========================================
CREATE TABLE bus (
    id            TEXT PRIMARY KEY, -- Server-generated ID
    car_no        TEXT NOT NULL UNIQUE,
    seat_capacity INTEGER NOT NULL CHECK (seat_capacity > 0),
    seat_no       TEXT[] NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT bus_seat_count_check
        CHECK (CARDINALITY(seat_no) = seat_capacity),
);


-- =========================================
-- BUS SCHEDULES
-- =========================================
CREATE TABLE bus_schedule (
    id               TEXT PRIMARY KEY,
    bus_id           TEXT NOT NULL,
    depart_time      TIMESTAMPTZ NOT NULL,
    est_arrival_time TIMESTAMPTZ NOT NULL,
    per_seat_cost    NUMERIC(12, 2) NOT NULL
                         CHECK (per_seat_cost >= 0),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT bus_schedule_bus_fk
        FOREIGN KEY (bus_id)
        REFERENCES bus (id)
        ON DELETE RESTRICT,

    CONSTRAINT schedule_arrival_after_departure
        CHECK (est_arrival_time > depart_time)
);

-- =========================================
-- TICKETS
-- =========================================
CREATE TABLE ticket (
    id            TEXT PRIMARY KEY,
    schedule_id   TEXT NOT NULL,
    user_id       TEXT NOT NULL,
    occupied_seat TEXT[] NOT NULL,
    total_amount  NUMERIC(12, 2) NOT NULL
                      CHECK (total_amount >= 0),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT ticket_schedule_fk
        FOREIGN KEY (schedule_id)
        REFERENCES bus_schedule (id)
        ON DELETE RESTRICT,

    CONSTRAINT ticket_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE RESTRICT,

    CONSTRAINT ticket_has_seats
        CHECK (CARDINALITY(occupied_seat) > 0)
);

-- =========================================
-- INDEXES
-- =========================================
CREATE INDEX idx_bus_schedule_bus_departure
    ON bus_schedule (bus_id, depart_time);

CREATE INDEX idx_ticket_schedule
    ON ticket (schedule_id);

CREATE INDEX idx_ticket_user_created
    ON ticket (user_id, created_at DESC);
