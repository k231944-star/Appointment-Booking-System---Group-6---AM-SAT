Software Requirements Specification (SRS)
1. Introduction
1.1 Purpose

This document describes the requirements of the Appointment Booking System. It explains the system features, user needs, and system behavior.

This document is used to guide the development of the system and ensure all team members understand what needs to be built.

1.2 Product Overview

The Appointment Booking System is a web-based application that allows users to book and manage appointments online.

It helps users check available time slots, create bookings, and manage their appointments. Admin users can manage services and schedules.

The system is designed to be simple, easy to use, and suitable for small businesses.

1.3 Scope

The system will support:

user registration and login
booking appointments
canceling or rescheduling appointments
viewing available time slots
admin management of services and schedules

The system will not include:

online payment
advanced business analytics
large-scale enterprise features
2. Primary Users and Goals
2.1 Primary Users
customers who want to book appointments
business owners or admin who manage bookings
2.2 Secondary Users
staff members who support booking management
system developers
2.3 User Goals
book appointments easily
check available time slots
avoid double booking
manage bookings (cancel or reschedule)
manage services and schedules (admin)
2.4 User Actions

Users will:

register and log in
select service and time
confirm booking
view or cancel bookings
admin will manage services and schedules
3. User Personas
Persona 1: Customer
Name: John
Age: 25
Background: A user who needs to book services online
Goals: Book an appointment quickly
Pain Points: Hard to find available time, booking errors
Persona 2: Admin
Name: Sarah
Age: 30
Background: Business owner managing appointments
Goals: Manage bookings and schedules
Pain Points: Manual booking is messy and time-consuming
4. Functional Requirements
4.1 Authentication
FR1: The system shall allow users to register and log in
FR2: The system shall authenticate users securely
4.2 Appointment Booking
FR3: The system shall allow users to book appointments
FR4: The system shall display available time slots
FR5: The system shall prevent double booking
4.3 Appointment Management
FR6: The system shall allow users to cancel appointments
FR7: The system shall allow users to reschedule appointments
4.4 Admin Management
FR8: The system shall allow admin to manage services
FR9: The system shall allow admin to manage schedules
FR10: The system shall allow admin to view bookings
5. Non-Functional Requirements
5.1 Usability
NFR1: The system shall be easy to use
NFR2: The system shall work on desktop and mobile
5.2 Performance
NFR3: The system should respond within 2–3 seconds
5.3 Reliability
NFR4: The system should be available most of the time
NFR5: The system should handle errors properly
5.4 Security
NFR6: User data must be protected
NFR7: The system shall prevent unauthorized access
6. User Stories
Booking
As a user, I want to book an appointment so that I can use a service
As a user, I want to see available time slots so that I can choose a suitable time
Management
As a user, I want to cancel or reschedule appointments
As an admin, I want to manage services and schedules
7. Acceptance Criteria
Booking
Users can select a service and time
Users can confirm booking successfully
System prevents double booking
Management
Users can cancel or reschedule appointments
Admin can manage services and schedules
System
The system loads quickly
The system works on different devices
8. Summary

The main users of this system are customers and admin users. The system helps users book and manage appointments easily.

It solves common problems such as double booking and manual scheduling. The system is simple, efficient, and suitable for small business use.
