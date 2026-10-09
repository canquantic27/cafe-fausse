CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(50),
    newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    time_slot TIMESTAMP NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count BETWEEN 1 AND 6),
    table_number INTEGER NOT NULL CHECK (table_number BETWEEN 1 AND 30),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (time_slot, table_number)
);
