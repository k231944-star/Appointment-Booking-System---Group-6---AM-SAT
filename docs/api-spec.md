# API Specification

## 1. Overview

This document defines the API structure for the **Appointment Booking System**.

The backend API supports the main system features:

- User registration and login
- Service management
- Time slot management
- Appointment booking
- Appointment cancellation and rescheduling
- Appointment viewing for customers and admin users

The API is designed for a web application using:

- **Frontend:** React
- **Backend:** Node.js with Express
- **Database:** PostgreSQL

---

## 2. Base URL

For local development:

```http
http://localhost:5000/api
```

For deployment, the base URL will depend on the cloud hosting platform.

Example:

```http
https://appointment-booking-system.com/api
```

---

## 3. Authentication

The system uses email and password authentication.

After login, the backend returns an authentication token.  
The frontend sends this token with protected requests.

### Authorization Header

```http
Authorization: Bearer <token>
```

Protected endpoints require a valid token.

---

## 4. Common Response Format

### Success Response

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

---

## 5. Authentication APIs

### 5.1 Register User

Creates a new customer account.

```http
POST /auth/register
```

#### Request Body

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "0412345678"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### Validation Rules

- Name is required
- Email is required and must be unique
- Password is required
- Phone number is optional

---

### 5.2 Login User

Allows a user or admin to log in.

```http
POST /auth/login
```

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "user_id": 1,
      "name": "John Smith",
      "email": "john@example.com",
      "role": "customer"
    }
  }
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 6. User APIs

### 6.1 Get Current User Profile

Returns the logged-in user's profile.

```http
GET /users/me
```

#### Headers

```http
Authorization: Bearer <token>
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "0412345678",
    "role": "customer"
  }
}
```

---

## 7. Service APIs

### 7.1 Get All Services

Returns the list of available services.

```http
GET /services
```

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "service_id": 1,
      "service_name": "Consultation",
      "duration": 30,
      "description": "General consultation appointment"
    },
    {
      "service_id": 2,
      "service_name": "Haircut",
      "duration": 45,
      "description": "Basic haircut service"
    }
  ]
}
```

---

### 7.2 Create Service

Creates a new service.

Admin only.

```http
POST /services
```

#### Headers

```http
Authorization: Bearer <admin_token>
```

#### Request Body

```json
{
  "service_name": "Dental Checkup",
  "duration": 60,
  "description": "Basic dental checkup appointment"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "service_id": 3,
    "service_name": "Dental Checkup",
    "duration": 60,
    "description": "Basic dental checkup appointment"
  }
}
```

---

### 7.3 Update Service

Updates an existing service.

Admin only.

```http
PUT /services/:service_id
```

#### Request Body

```json
{
  "service_name": "Updated Service",
  "duration": 45,
  "description": "Updated service description"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Service updated successfully"
}
```

---

### 7.4 Delete Service

Deletes an existing service.

Admin only.

```http
DELETE /services/:service_id
```

#### Success Response

```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

## 8. Time Slot APIs

### 8.1 Get Available Time Slots

Returns available time slots.

```http
GET /time-slots
```

#### Query Parameters

| Parameter | Required | Description |
|---|---|---|
| date | No | Filter time slots by date |
| status | No | Filter by status: available or booked |

#### Example

```http
GET /time-slots?date=2026-04-20&status=available
```

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "slot_id": 1,
      "slot_date": "2026-04-20",
      "start_time": "09:00",
      "end_time": "09:30",
      "status": "available"
    }
  ]
}
```

---

### 8.2 Create Time Slot

Creates a new time slot.

Admin only.

```http
POST /time-slots
```

#### Request Body

```json
{
  "slot_date": "2026-04-20",
  "start_time": "09:00",
  "end_time": "09:30"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Time slot created successfully",
  "data": {
    "slot_id": 1,
    "slot_date": "2026-04-20",
    "start_time": "09:00",
    "end_time": "09:30",
    "status": "available"
  }
}
```

---

### 8.3 Update Time Slot

Updates an existing time slot.

Admin only.

```http
PUT /time-slots/:slot_id
```

#### Request Body

```json
{
  "slot_date": "2026-04-20",
  "start_time": "10:00",
  "end_time": "10:30",
  "status": "available"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Time slot updated successfully"
}
```

---

### 8.4 Delete Time Slot

Deletes a time slot.

Admin only.

```http
DELETE /time-slots/:slot_id
```

#### Success Response

```json
{
  "success": true,
  "message": "Time slot deleted successfully"
}
```

---

## 9. Appointment APIs

### 9.1 Create Appointment

Creates a new appointment booking.

```http
POST /appointments
```

#### Headers

```http
Authorization: Bearer <token>
```

#### Request Body

```json
{
  "service_id": 1,
  "slot_id": 1,
  "notes": "First consultation appointment"
}
```

#### Backend Logic

Before creating an appointment, the backend must:

1. Check if the selected time slot exists
2. Check if the time slot status is available
3. Prevent double booking
4. Save the appointment
5. Update time slot status to booked

#### Success Response

```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "appointment_id": 1,
    "service_id": 1,
    "slot_id": 1,
    "status": "confirmed",
    "notes": "First consultation appointment"
  }
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Selected time slot is not available"
}
```

---

### 9.2 Get My Appointments

Returns appointments for the logged-in customer.

```http
GET /appointments/my
```

#### Headers

```http
Authorization: Bearer <token>
```

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "appointment_id": 1,
      "service_name": "Consultation",
      "slot_date": "2026-04-20",
      "start_time": "09:00",
      "end_time": "09:30",
      "status": "confirmed",
      "notes": "First consultation appointment"
    }
  ]
}
```

---

### 9.3 Get All Appointments

Returns all appointments.

Admin only.

```http
GET /appointments
```

#### Headers

```http
Authorization: Bearer <admin_token>
```

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "appointment_id": 1,
      "customer_name": "John Smith",
      "service_name": "Consultation",
      "slot_date": "2026-04-20",
      "start_time": "09:00",
      "end_time": "09:30",
      "status": "confirmed"
    }
  ]
}
```

---

### 9.4 Reschedule Appointment

Updates the time slot of an appointment.

```http
PUT /appointments/:appointment_id/reschedule
```

#### Headers

```http
Authorization: Bearer <token>
```

#### Request Body

```json
{
  "new_slot_id": 2
}
```

#### Backend Logic

Before rescheduling, the backend must:

1. Check if the appointment exists
2. Check if the new time slot is available
3. Update the appointment slot
4. Mark old slot as available
5. Mark new slot as booked

#### Success Response

```json
{
  "success": true,
  "message": "Appointment rescheduled successfully"
}
```

---

### 9.5 Cancel Appointment

Cancels an appointment.

```http
PUT /appointments/:appointment_id/cancel
```

#### Headers

```http
Authorization: Bearer <token>
```

#### Backend Logic

When an appointment is cancelled:

1. Appointment status is changed to cancelled
2. The related time slot is marked as available

#### Success Response

```json
{
  "success": true,
  "message": "Appointment cancelled successfully"
}
```

---

### 9.6 Update Appointment Status

Updates appointment status.

Admin only.

```http
PUT /appointments/:appointment_id/status
```

#### Request Body

```json
{
  "status": "completed"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Appointment status updated successfully"
}
```

---

## 10. Dashboard APIs

### 10.1 Customer Dashboard

Returns summary information for the logged-in customer.

```http
GET /dashboard/customer
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "upcoming_appointments": 2,
    "cancelled_appointments": 1,
    "completed_appointments": 3
  }
}
```

---

### 10.2 Admin Dashboard

Returns system summary information for admin users.

Admin only.

```http
GET /dashboard/admin
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "total_users": 25,
    "total_services": 5,
    "total_appointments": 40,
    "booked_slots": 18
  }
}
```

---

## 11. Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Bad request or validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Conflict, such as double booking |
| 500 | Server error |

---

## 12. Security Notes

- Passwords must be encrypted before storage
- Protected routes require authentication
- Admin-only routes require admin role
- User input should be validated before database operations
- The backend should not expose sensitive data such as passwords

---

## 13. Summary

This API specification supports the main requirements of the Appointment Booking System.

It provides endpoints for:

- Authentication
- Service management
- Time slot management
- Appointment booking
- Dashboard summaries

The API structure supports secure, organized, and scalable communication between the frontend, backend, and database.
