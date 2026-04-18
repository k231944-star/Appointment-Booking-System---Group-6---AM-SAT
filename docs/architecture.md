# System Architecture

## 1. Introduction

This document describes the architecture of the Appointment Booking System.  
It explains how the system is structured, how different components interact, and how core functionalities such as authentication, booking, and scheduling are implemented.

The architecture is designed to provide a clear separation between user interface, business logic, and data management, ensuring that the system is maintainable, scalable, and easy to understand.

---

## 2. Architectural Overview

The system follows a **three-tier architecture**, which consists of:

- Presentation Layer (Frontend)
- Application Layer (Backend)
- Data Layer (Database)

Each layer has a specific responsibility:

- The frontend handles user interaction
- The backend processes logic and rules
- The database manages persistent data

This separation improves system organization and allows each part to be developed independently.

---

## 3. Architecture Style

The system is implemented using a **monolithic architecture**.

All system functionalities, including authentication, booking, scheduling, and service management, are handled within a single backend application.

### Reasons for Choosing Monolithic Architecture

- Simpler to develop and deploy
- Easier to debug and maintain during early stages
- Suitable for small to medium-sized applications
- Reduces communication overhead between services

Although microservices provide scalability, a monolithic approach is more appropriate for this project due to its scope and timeline.

---

## 4. Technology Stack

The system uses the following technologies:

| Layer | Technology | Purpose |
|------|-----------|--------|
| Frontend | React | User interface |
| Backend | Node.js (Express) | Business logic and APIs |
| Database | PostgreSQL | Data storage |

### Justification

- React allows modular and reusable UI components  
- Node.js supports asynchronous request handling  
- PostgreSQL ensures reliable relational data storage  

---

## 5. Architecture Diagram

```mermaid
flowchart LR
    User[User]
    Frontend[Frontend Layer]
    Backend[Backend Layer]
    Database[(Database Layer)]

    User -->|Interaction| Frontend
    Frontend -->|API Request| Backend
    Backend -->|Query / Update| Database
    Database -->|Response| Backend
    Backend -->|Result| Frontend
    Frontend -->|Display| User
