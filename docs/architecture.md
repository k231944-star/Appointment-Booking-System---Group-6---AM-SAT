# System Architecture

## 1. Introduction

This document describes the technical architecture of the Appointment Booking System.  
It outlines the system structure, components, data flow, and design decisions that support core functionalities such as authentication, scheduling, and appointment management.

---

## 2. Architectural Overview

The system is designed using a **three-tier architecture**, consisting of:

- Presentation Layer (Frontend)
- Application Layer (Backend)
- Data Layer (Database)

This layered approach ensures clear separation of concerns, allowing each part of the system to evolve independently while maintaining overall system integrity.

---

## 3. Architecture Style

The system follows a **monolithic architecture**.

All core services—including authentication, booking, scheduling, and service management—are implemented within a single backend application.

### Rationale:
- Suitable for small to medium-scale applications  
- Reduces operational complexity compared to microservices  
- Simplifies development, deployment, and debugging  
- Enables faster iteration during early development stages  

---

## 4. Technology Stack

The system is built using the following technologies:

| Layer | Technology |
|------|-----------|
| Frontend | React |
| Backend | Node.js (Express) |
| Database | PostgreSQL |

### Justification:
- React provides a responsive and modular UI  
- Node.js enables efficient handling of asynchronous requests  
- PostgreSQL ensures reliable relational data management  

---

## 5. Architecture Diagram

```mermaid
flowchart LR
    User[User]
    Frontend[Frontend Layer]
    Backend[Backend Layer]
    Database[(Database Layer)]

    User -->|Interaction| Frontend
    Frontend -->|HTTP Request| Backend
    Backend -->|Query / Update| Database
    Database -->|Result| Backend
    Backend -->|Response| Frontend
    Frontend -->|Render UI| User
