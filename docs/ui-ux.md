# UI/UX Design Documentation - Appointment Booking System (AppointSync)

This document outlines the User Interface (UI) and User Experience (UX) design process for the AppointSync project by Group 6. It includes design specifications, wireframe structures, user interaction storyboards, and system data flows.

---

## 1. Visual Design Specifications
The system employs a modern design language featuring **Glass-morphism** and **Dark Mode** to enhance the high-tech aesthetic while reducing eye strain for users.

* **Core Colors (CSS Variables):** * Primary accent color: `--primary-blue` (`#3B82F6`).
  * Glass background: `--glass-bg` (`rgba(255,255,255,0.05)`).
  * Blur effect: `--glass-blur` (`blur(15px)`).
  * Borders: `--border` (`1px solid rgba(255,255,255,0.1)`).
* **Typography Rules:** * Primary fonts: **Urbanist** or **Inter**. 
  * Titles: 700 Weight (Electric Blue).
  * Body text: 400 Weight (Slate White).
  * Action Items (Buttons): Uppercase, 600 Weight.

> ![alt text](image.png)

---

## 2. Wireframes
The wireframes outline the core structure and fundamental information architecture for interactive pages:

* **Book an Appointment:** The scheduling process is divided into 3 clear steps (Step 1: Date & Time, Step 2: Your Details, Step 3: Service & Notes).
* **My Bookings / Dashboard:** The client appointment management list featuring an intuitive Navigation Bar.
* **Input Forms:** Personal information layout with clearly defined fields (Full Name, Email, Phone Number).

> ![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)

---

## 3. Storyboard (User Flow)
The storyboard simulates the user's journey from landing on the platform to successfully booking an appointment:

1. **Landing & Service Selection:** The client visits the home page and clicks on a specific Service Card.
2. **Date & Time Selection:** The user selects a date on the Calendar and clicks on an available Time Slot button.
3. **User Info Form:** The user fills out the personal details form and clicks "Confirm Booking".
4. **Success & Record Creation:** The system sends an `INSERT` query to the database and displays a success screen with a Reference ID.
5. **Client Portal Dashboard:** The client is redirected to the "My Bookings" page to view, modify, or cancel their `Active` appointments.

> ![alt text](image-4.png)
![alt text](image-5.png)

---

## 4. High-Fidelity UI
The high-fidelity UI designs accurately represent the final user experience on the developed interface:

* **Landing Page:** Features the core message "Seamless Scheduling, Crystal Clear Management".
* **Book Your Appointment:** A Dark Mode interface displaying an intuitive calendar; booked time slots are dimmed/disabled.
* **Dashboard (Welcome Back):** A personalized control panel with summary cards (Total Sessions, Hours Saved, Upcoming Alerts) and a categorized appointment list (Confirmed, Pending, Cancelled).
* **Appointment Details:** A detailed view of a specific appointment featuring quick action buttons (Join Video Call, Get Directions, Reschedule, Cancel).

> ![alt text](image-6.png)
![alt text](image-7.png)
![alt text](image-8.png)

---

## 5. System Sequence Diagrams
UX design goes beyond the visual interface; it includes the architectural data flow (React + Express + MySQL/PostgreSQL):

### 1. User Authentication Flow (Login/Register)
* The Frontend captures user input (Email/Password) -> Calls `authService.login()`.
* The Backend routes the request and queries the `users` table in the database.
* Returns a JWT Token and redirects the user to the Dashboard UI.

### 2. Booking Creation Flow
* The user selects Date/Time/Service -> Calls `createBooking()`.
* The payload passes through the Auth Middleware to verify the JWT Token.
* The Controller executes `INSERT INTO bookings`.
* Returns a success response (201 Created) and updates the UI.

### 3. Service Retrieval Flow
* On page load, the frontend calls `GET /api/services`.
* The Backend queries the `services` table via `SELECT * FROM services`.
* Returns a JSON array containing the service list to dynamically render the UI cards.

>![alt text](image-9.gpn)
![alt text](image-10.png)
![alt text](image-11.png)
