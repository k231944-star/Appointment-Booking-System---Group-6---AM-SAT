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
    U[Customer / Admin]
    FE[Frontend (React)]
    BE[Backend (Node.js / Express)]
    DB[(PostgreSQL Database)]

    U --> FE
    FE --> BE
    BE --> DB
    DB --> BE
    BE --> FE
    FE --> U
