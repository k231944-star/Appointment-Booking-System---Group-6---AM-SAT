-- Appointment Booking System - Database Schema
-- Database: PostgreSQL
-- ============================================================

-- Drop existing tables and types for development reset
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS time_slots CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS slot_status CASCADE;
DROP TYPE IF EXISTS appointment_status CASCADE;

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_role AS ENUM ('customer', 'admin');

CREATE TYPE slot_status AS ENUM ('available', 'booked');

CREATE TYPE appointment_status AS ENUM ('confirmed', 'cancelled', 'completed');

-- ============================================================
-- USERS TABLE
-- Stores customer and admin account information
-- ============================================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_users_phone_unique
ON users(phone)
WHERE phone IS NOT NULL;

-- ============================================================
-- SERVICES TABLE
-- Stores service information
-- ============================================================

CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL UNIQUE,
    duration INTEGER NOT NULL CHECK (duration > 0),
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TIME SLOTS TABLE
-- Stores available appointment time slots
-- ============================================================

CREATE TABLE time_slots (
    slot_id SERIAL PRIMARY KEY,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status slot_status NOT NULL DEFAULT 'available',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_time_slot_valid
        CHECK (end_time > start_time),

    CONSTRAINT uq_time_slot
        UNIQUE (slot_date, start_time, end_time)
);

-- ============================================================
-- APPOINTMENTS TABLE
-- Stores appointment booking records
-- ============================================================

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    slot_id INTEGER NOT NULL,
    status appointment_status NOT NULL DEFAULT 'confirmed',
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_appointments_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_appointments_service
        FOREIGN KEY (service_id)
        REFERENCES services(service_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_appointments_slot
        FOREIGN KEY (slot_id)
        REFERENCES time_slots(slot_id)
        ON DELETE RESTRICT
);

-- Prevent double booking.
-- Only one active appointment can use the same time slot.
CREATE UNIQUE INDEX idx_unique_active_appointment_slot
ON appointments(slot_id)
WHERE status = 'confirmed';

-- ============================================================
-- INDEXES
-- Improve query performance
-- ============================================================

CREATE INDEX idx_appointments_user_id
ON appointments(user_id);

CREATE INDEX idx_appointments_service_id
ON appointments(service_id);

CREATE INDEX idx_appointments_slot_id
ON appointments(slot_id);

CREATE INDEX idx_time_slots_date_status
ON time_slots(slot_date, status);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- Automatically updates updated_at when a row changes
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_time_slots_updated_at
BEFORE UPDATE ON time_slots
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TIME SLOT STATUS TRIGGER FUNCTION
-- Keeps time slot status updated based on appointment status
-- ============================================================

CREATE OR REPLACE FUNCTION sync_time_slot_status()
RETURNS TRIGGER AS $$
BEGIN
    -- When a new appointment is confirmed, mark the slot as booked
    IF TG_OP = 'INSERT' THEN
        IF NEW.status = 'confirmed' THEN
            UPDATE time_slots
            SET status = 'booked',
                updated_at = CURRENT_TIMESTAMP
            WHERE slot_id = NEW.slot_id;
        END IF;

        RETURN NEW;
    END IF;

    -- When appointment is updated
    IF TG_OP = 'UPDATE' THEN

        -- If slot is changed, make old slot available
        IF OLD.slot_id <> NEW.slot_id THEN
            UPDATE time_slots
            SET status = 'available',
                updated_at = CURRENT_TIMESTAMP
            WHERE slot_id = OLD.slot_id;
        END IF;

        -- If appointment is confirmed, mark new slot as booked
        IF NEW.status = 'confirmed' THEN
            UPDATE time_slots
            SET status = 'booked',
                updated_at = CURRENT_TIMESTAMP
            WHERE slot_id = NEW.slot_id;
        END IF;

        -- If appointment is cancelled, mark slot as available
        IF NEW.status = 'cancelled' THEN
            UPDATE time_slots
            SET status = 'available',
                updated_at = CURRENT_TIMESTAMP
            WHERE slot_id = NEW.slot_id;
        END IF;

        RETURN NEW;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_time_slot_status_insert
AFTER INSERT ON appointments
FOR EACH ROW
EXECUTE FUNCTION sync_time_slot_status();

CREATE TRIGGER trg_sync_time_slot_status_update
AFTER UPDATE OF status, slot_id ON appointments
FOR EACH ROW
EXECUTE FUNCTION sync_time_slot_status();

-- ============================================================
-- SAMPLE DATA
-- ============================================================

INSERT INTO users (name, email, password, phone, role) VALUES
('Admin User', 'admin@example.com', 'hashed_admin_password', '0400000000', 'admin'),
('Customer User', 'customer@example.com', 'hashed_customer_password', '0411111111', 'customer');

INSERT INTO services (service_name, duration, description) VALUES
('Consultation', 30, 'General consultation appointment'),
('Haircut', 45, 'Basic haircut service'),
('Dental Checkup', 60, 'Basic dental checkup appointment');

INSERT INTO time_slots (slot_date, start_time, end_time, status) VALUES
('2026-04-20', '09:00', '09:30', 'available'),
('2026-04-20', '10:00', '10:30', 'available'),
('2026-04-21', '14:00', '14:30', 'available');

-- Example appointment.
-- This automatically marks the selected time slot as booked.
INSERT INTO appointments (user_id, service_id, slot_id, status, notes) VALUES
(2, 1, 1, 'confirmed', 'First consultation appointment');
