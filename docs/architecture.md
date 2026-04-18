# System Architecture

## Overview
The Appointment Booking System follows a three-tier architecture consisting of:

- Frontend (Client)
- Backend (Server)
- Database

This structure helps separate concerns, improve scalability, and make the system easier to maintain.

---

## Architecture Diagram

```mermaid
flowchart LR
    User[User]
    Frontend[Frontend - React]
    Backend[Backend - Node.js Express]
    Database[(PostgreSQL Database)]

    User -->|User Actions| Frontend
    Frontend -->|API Requests| Backend
    Backend -->|Query Data| Database
    Database -->|Return Data| Backend
    Backend -->|Response| Frontend
    Frontend -->|Display Result| User
