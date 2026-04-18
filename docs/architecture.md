# System Architecture

## 1. Overview

The Appointment Booking System is designed using a three-tier architecture that separates the system into three main layers:

- Frontend (Client Layer)
- Backend (Application Layer)
- Database (Data Layer)

This architecture improves system organization, scalability, and maintainability by separating user interface, business logic, and data storage.

---

## 2. Architecture Type

The system follows a **monolithic architecture**.

All core functionalities such as authentication, booking, service management, and scheduling are implemented within a single backend application.

This approach is suitable for this project because:
- The system scope is small to medium
- It simplifies development and deployment
- It reduces complexity compared to microservices

---

## 3. Tech Stack

The system uses the following technologies:

- **Frontend:** React  
- **Backend:** Node.js with Express  
- **Database:** PostgreSQL  

These technologies support full stack development and are widely used for web-based systems.

---

## 4. Architecture Diagram

```mermaid
flowchart LR
    User[User]
    Frontend[Frontend - React]
    Backend[Backend - Node.js Express]
    Database[(PostgreSQL Database)]

    User -->|User Actions| Frontend
    Frontend -->|API Requests| Backend
    Backend -->|Read / Write Data| Database
    Database -->|Return Data| Backend
    Backend -->|Response| Frontend
    Frontend -->|Display Result| User
