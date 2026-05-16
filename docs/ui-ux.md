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

> <img width="891" height="497" alt="image" src="https://github.com/user-attachments/assets/81114098-0543-4157-914f-c49e50c88863" />


---

## 2. Wireframes
The wireframes outline the core structure and fundamental information architecture for interactive pages:

* **Book an Appointment:** The scheduling process is divided into 3 clear steps (Step 1: Date & Time, Step 2: Your Details, Step 3: Service & Notes).
* **My Bookings / Dashboard:** The client appointment management list featuring an intuitive Navigation Bar.
* **Input Forms:** Personal information layout with clearly defined fields (Full Name, Email, Phone Number).

><img width="940" height="915" alt="image" src="https://github.com/user-attachments/assets/f5a9cf62-471f-4c97-a09c-c7d39809995e" />
<img width="940" height="574" alt="image" src="https://github.com/user-attachments/assets/43be95b2-a8ab-459d-ad68-50e1bbd36468" />
<img width="941" height="584" alt="image" src="https://github.com/user-attachments/assets/781fd7ae-0d23-48dc-97dc-dbcad1be36b1" />


---

## 3. Storyboard (User Flow)
The storyboard simulates the user's journey from landing on the platform to successfully booking an appointment:

1. **Landing & Service Selection:** The client visits the home page and clicks on a specific Service Card.
2. **Date & Time Selection:** The user selects a date on the Calendar and clicks on an available Time Slot button.
3. **User Info Form:** The user fills out the personal details form and clicks "Confirm Booking".
4. **Success & Record Creation:** The system sends an `INSERT` query to the database and displays a success screen with a Reference ID.
5. **Client Portal Dashboard:** The client is redirected to the "My Bookings" page to view, modify, or cancel their `Active` appointments.

> <img width="940" height="429" alt="image" src="https://github.com/user-attachments/assets/f9f199c3-29d8-40c4-b188-d8396b37fb62" />
<img width="598" height="424" alt="image" src="https://github.com/user-attachments/assets/3f3cbb42-0c68-4817-8f02-a850a845b409" />


---

## 4. High-Fidelity UI
The high-fidelity UI designs accurately represent the final user experience on the developed interface:

* **Landing Page:** Features the core message "Seamless Scheduling, Crystal Clear Management".
* **Book Your Appointment:** A Dark Mode interface displaying an intuitive calendar; booked time slots are dimmed/disabled.
* **Dashboard (Welcome Back):** A personalized control panel with summary cards (Total Sessions, Hours Saved, Upcoming Alerts) and a categorized appointment list (Confirmed, Pending, Cancelled).
* **Appointment Details:** A detailed view of a specific appointment featuring quick action buttons (Join Video Call, Get Directions, Reschedule, Cancel).

> <img width="940" height="612" alt="image" src="https://github.com/user-attachments/assets/3b13b151-c7b2-4ba4-8bdf-975770f508c7" />
<img width="940" height="517" alt="image" src="https://github.com/user-attachments/assets/fd87be7f-06d4-4719-a587-7b8d151fc4d1" />
<img width="940" height="520" alt="image" src="https://github.com/user-attachments/assets/d37a2611-49fe-49a7-9153-91e0f175b26c" />


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

<img width="940" height="898" alt="image" src="https://github.com/user-attachments/assets/28d6755a-f991-471e-9ea3-0909fcb86edc" />
<img width="940" height="900" alt="image" src="https://github.com/user-attachments/assets/3dad2a2c-cddd-4f2c-bc4d-397ca371c39f" />
<img width="940" height="849" alt="image" src="https://github.com/user-attachments/assets/e450eaf3-79ce-44ef-89b7-17e0cf2e9dd9" />

