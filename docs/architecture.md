# Architecture

## Overview

The Appointment Booking System uses a simple three-layer architecture:

- Frontend (React)
- Backend (Node.js + Express)
- Database (PostgreSQL)

This structure separates user interface, business logic, and data storage to improve maintainability and scalability.

---

## Architecture Diagram

```mermaid
flowchart LR
    User[User (Customer/Admin)]
    Frontend[Frontend - React]
    Backend[Backend - Node.js Express]
    Database[(PostgreSQL Database)]

    User -->|User Actions| Frontend
    Frontend -->|API Requests| Backend
    Backend -->|Query / Store Data| Database
    Database -->|Return Data| Backend
    Backend -->|Response| Frontend
    Frontend -->|Display Result| User
