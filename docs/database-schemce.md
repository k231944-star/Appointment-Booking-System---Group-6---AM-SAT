# Database Schema Specification - AppointSync

## 1. Database Architecture Overview
[cite_start]The **AppointSync** system utilizes **PostgreSQL** as its core Relational Database Management System (RDBMS)[cite: 7, 9]. [cite_start]The architecture is designed to support a decoupled multi-tier system where the PHP backend handles data integrity, session management, and relational constraints[cite: 9, 28].

---

## 2. Data Dictionary

### 2.1. Table: `users`
[cite_start]This table manages user authentication, identity, and role-based access control[cite: 13, 26].

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | [cite_start]Unique auto-incrementing identifier[cite: 13]. |
| `username` | `VARCHAR(50)` | `UNIQUE, NOT NULL` | [cite_start]Unique identifier for login[cite: 13]. |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Secured password using `password_hash()`[cite: 13, 14]. |
| `role` | `VARCHAR(20)` | `CHECK (role IN ('admin', 'customer'))` | [cite_start]Access level: `admin` or `customer`[cite: 13, 16]. |
| `name` | `VARCHAR(100)` | `NOT NULL` | [cite_start]The legal full name of the user[cite: 13, 14]. |
| `email` | `VARCHAR(100)` | `NOT NULL` | [cite_start]Contact email address[cite: 13, 14]. |
| `phone` | `VARCHAR(20)` | `NULL` | [cite_start]Optional contact number[cite: 13]. |

### 2.2. Table: `services`
[cite_start]Defines the catalog of available services and their associated metadata[cite: 16, 26].

| Column | Data Type | Description |
| :--- | :--- | :--- |
| `id` | `SERIAL` | [cite_start]Unique service identifier[cite: 20]. |
| `name` | `VARCHAR(100)` | [cite_start]Display name of the service (e.g., General Consultation)[cite: 20]. |
| `duration_minutes`| `INTEGER` | [cite_start]Time length of the service used for slot calculation[cite: 20]. |
| `price` | `DECIMAL(10,2)`| [cite_start]Service cost per session[cite: 20]. |

### 2.3. Table: `appointments`
[cite_start]The central transactional table for storing and managing booking records[cite: 21, 28].

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | [cite_start]Unique booking reference ID[cite: 21]. |
| `user_id` | `INTEGER` | `FK (users.id)` | [cite_start]Link to the client account[cite: 21]. |
| `service_id` | `INTEGER` | `FK (services.id)` | [cite_start]Link to the specific service type[cite: 21]. |
| `appointment_date`| `DATE` | `NOT NULL` | [cite_start]The scheduled date[cite: 21, 26]. |
| `appointment_time`| `TIME` | `NOT NULL` | [cite_start]The scheduled start time[cite: 21, 26]. |
| `status` | `VARCHAR(20)` | `DEFAULT 'pending'`| [cite_start]Current state: `confirmed`, `cancelled`, or `pending`[cite: 19, 21]. |
| `notes` | `TEXT` | `NULL` | [cite_start]Optional details or requests from the user[cite: 21]. |

---

## 3. Implementation & Operational Logic

### 3.1. Database Initialization (`setup.php`)
[cite_start]The database and the `users` table are programmatically initialized using a setup script that ensures the environment is ready for production[cite: 11, 13].
* [cite_start]**Automatic Creation**: The script checks if `appointment_system` exists and creates it if missing[cite: 12].
* [cite_start]**Table Constraints**: Implements a `CHECK` constraint on the `role` column to restrict values to `admin` or `customer`[cite: 13].

### 3.2. Transactional Integrity & Conflict Prevention
[cite_start]The system prevents double-bookings by executing a `SELECT` verification query prior to any `INSERT` operation in `book_appointment.php`[cite: 21, 26].
* [cite_start]**Conflict Check Logic**: The backend queries for existing records on the same date and time slot[cite: 21, 26].
* [cite_start]**Error Handling**: If a record is found, the transaction is halted, and an error message ("This time slot is already booked") is displayed to the user[cite: 21].

### 3.3. Connection Management (`config.php`)
[cite_start]All database interactions use **PHP Data Objects (PDO)** to ensure secure and efficient communication[cite: 15, 16].
* [cite_start]**Error Mode**: Set to `PDO::ERRMODE_EXCEPTION` for robust error handling and debugging[cite: 15].
* [cite_start]**Fetch Mode**: Defaulted to `PDO::FETCH_ASSOC` for cleaner data processing[cite: 16].
* [cite_start]**Security**: Prepared Statements are used globally to prevent SQL Injection attacks[cite: 21].
