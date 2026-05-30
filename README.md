# Appointment-Booking-System---Group-6---AM-SAT
# AppointSync - Smart Dental Appointment Booking System

**Course:** CPRO306 - Capstone Project
**Institution:** Kent Institute Australia
**Team:** Group 6 (Saturday Morning - Sydney Campus)

## Project Overview
AppointSync is a comprehensive, full-stack web application designed to streamline the dental appointment booking process. The system aims to resolve the inefficiencies of manual scheduling by providing a centralized, secure, and intelligent platform for both patients and clinic administrators. 

Originally planned with a PHP architecture, the development team executed an agile technology pivot to a modern JavaScript-based stack (React.js and Node.js) to better handle asynchronous operations, specifically for the integration of the Artificial Intelligence chatbot module.

## Team Members
* Nguyen Dang Minh Tran (K231944) - Project Manager
* Tomasz Konpa - Backend Developer
* Labib Hossain Limon - Frontend Developer
* Nishan Thapa - Frontend Developer 
* Prajwal Khadka - UI/UX Designer

## System Architecture and Technology Stack
The application operates on a decoupled client-server architecture to ensure high cohesion and maintainability.

* **Frontend Environment:** React.js (built with Vite for optimized rendering), React-Bootstrap for responsive UI components, Axios for API communication, and React Router DOM for secure navigation.
* **Backend Environment:** Node.js running Express.js framework, providing RESTful API endpoints.
* **Database Management:** PostgreSQL (relational database), optimized into two core tables to ensure data integrity and query performance.
* **External API Integration:** Google Gemini 2.0 Flash AI via the official Google Gen AI SDK.

## Core System Modules
### 1. Artificial Intelligence Smart Assistant
Integrated directly into the user interface, the system features a context-aware chatbot powered by Google Gemini. Through strict prompt engineering, the AI is constrained to act solely as a dental clinic assistant, providing users with instant information regarding clinic services, operating hours, and booking procedures without requiring human intervention.

### 2. Secure Authentication and Authorization
Security is paramount in healthcare-adjacent applications. The system utilizes JSON Web Tokens (JWT) for stateless authentication. Protected routes are implemented on the frontend to prevent unauthorized access to personal dashboards. Furthermore, custom state validation logic ensures that if a user updates sensitive data (such as their email address), the current session is immediately invalidated, forcing a secure re-login.

### 3. Dynamic Booking Engine
The core scheduling module allows registered users to book, view, and manage their dental appointments. To prevent invalid data entries, the frontend incorporates dynamic validation logic that strictly blocks users from selecting past dates on the calendar interface.

### 4. Administrative Dashboard
A dedicated, role-based dashboard for clinic administrators. This module fetches real-time data from the PostgreSQL database, allowing staff to monitor all registered customer profiles and oversee the entire appointment schedule through a clean, tabbed interface.

---

## Deployment and Local Installation Guide

To run this project locally for evaluation or development purposes, please follow the detailed instructions below.

### 1. Prerequisites
Ensure the following software is installed on your local machine:
* Node.js (Version 16.0 or higher)
* npm (Node Package Manager)
* PostgreSQL (Local installation via pgAdmin or a Cloud Database provider such as Neon.tech)
* Git

### 2. Repository Cloning
Open your command line interface and clone the source code:
```bash
git clone [https://github.com/k231944-star/Appointment-Booking-System---Group-6---AM-SAT.git](https://github.com/k231944-star/Appointment-Booking-System---Group-6---AM-SAT.git)
cd Appointment-Booking-System---Group-6---AM-SAT
```

### 3. Database Configuration
The system requires two core tables: `login` and `appointments`.
1. Open your PostgreSQL management tool (e.g., pgAdmin).
2. Create a new database named `appointsync_db`.
3. Locate the `database/schema.sql` file within the cloned repository.
4. Execute the SQL queries contained in the file to construct the tables and insert the default administrative account.

### 4. Backend Server Setup
Navigate to the server directory and install the necessary dependencies:
```bash
cd server
npm install
```

**Environment Variables:**
Create a file named `.env` in the root of the `server` directory. This file must contain your secure configuration strings. Do not commit this file to version control.
```env
# Server Configuration
PORT=4446

# PostgreSQL Database Connection String
DATABASE_URL=postgresql://[username]:[password]@[host]:[port]/[database_name]

# Google Gemini API Key
GEMINI_API_KEY=your_actual_api_key_here
```

**Execution:**
Start the backend application:
```bash
npm start
```
The console should confirm that the server is running on the designated port.

### 5. Frontend Client Setup
Open a new terminal session, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

**Execution:**
Start the Vite development server:
```bash
npm run dev
```
The command line will provide a local URL (typically `http://localhost:5173/`). Access this URL via a web browser to interact with the AppointSync application.

## License and Academic Integrity
This project is submitted in partial fulfillment of the requirements for the CPRO306 Capstone Project at Kent Institute Australia. The source code is the intellectual property of the Group 6 team members.