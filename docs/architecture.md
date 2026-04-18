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
## 5. Component Description

### 5.1 Frontend

The frontend is responsible for the user interface and user interaction.

Main responsibilities:
- Display login and registration pages
- Display booking forms
- Show dashboard and appointment information
- Show available time slots
- Send requests to the backend
- Display responses to the user

The frontend is built using React and provides a simple and user-friendly experience.

---

### 5.2 Backend

The backend handles the main business logic of the system.

Main responsibilities:
- Process login and registration requests
- Handle booking, cancellation, and rescheduling
- Manage services and schedules
- Validate time slot availability
- Prevent double booking
- Communicate with the database
- Return responses to the frontend

The backend is built using Node.js and Express.

---

### 5.3 Database

The database stores all system data in a structured format.

Main entities:
- Users
- Services
- Time Slots
- Appointments

The database supports scheduling, service management, and appointment tracking.  
It also helps maintain consistency and prevent data conflicts.

## 6. Architecture Diagram

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
    Frontend -->|Display| User ```

## 7. Functional Requirements Summary

The system supports the following main functional requirements:

- User registration and login  
- Viewing available time slots  
- Booking appointments  
- Cancelling appointments  
- Rescheduling appointments  
- Viewing services  
- Viewing appointments  
- Managing services (admin)  
- Managing schedules (admin)  
- Authentication  
- Preventing double booking  
- Calendar display  

These functions are implemented mainly in the backend, while the frontend provides the interface for users and administrators to interact with the system.

## 8. Non-Functional Requirements Summary

The system also supports important non-functional requirements:

### Performance
The system should respond quickly to user requests and support multiple users simultaneously.

### Security
The system should protect user data through authentication and encrypted password storage.

### Usability
The system should provide a simple and user-friendly interface to help users complete tasks easily.

### Reliability
The system should handle errors effectively and maintain stable operation.

### Scalability
The system should be designed to support future growth in users and features.

### Data Protection and Privacy
The system should store only necessary data and ensure that it is protected from unauthorized access.

## 9. Conclusion

The architecture of the Appointment Booking System provides a clear and structured foundation for the project.  
It supports both functional and non-functional requirements while keeping the system simple, maintainable, and suitable for future improvements.
