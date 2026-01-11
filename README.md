Employee Management System with Onboarding Feature

This project is a full-stack Employee Management System where office admins can perform CRUD operations, track employee attendance, and view analytics.

To showcase extended functionality and my approach to project enhancement, I integrated a Multi-Step Employee Onboarding feature directly into the existing system. You can access it from the Dashboard → Onboard Employee section.

Key Features of Onboarding Module

Multi-Level Form (Wizard) with:

Step-wise navigation and validation

Scroll to first error on invalid input

Dynamic fields and conditional logic

Progress bar and step indicators

Save, reset, and persistent data across refreshes

Notes for Demo

The project uses JWT-based authentication and protected routes. By default, internal routes require login.

For demo purposes, protected routes have been temporarily disabled. You can access the dashboard directly at: https://localhost/Dashboard

Tech Stack

Frontend: React (Hooks), TypeScript (optional), Tailwind CSS / CSS Modules

Form Handling & Validation: Formik, Yup

Routing: React Router

State Management & Persistence: Local Storage

Backend Integration: JWT authentication (Full-Stack)

File Handling: Dynamic file uploads in forms

UI Enhancements: Multi-step form, progress bars, scroll to first error

Installation & Running the Project

Install dependencies-npm install

Run the project- npm start

By default, routes are protected with JWT authentication.
For demo purposes, protected routes have been temporarily disabled. You can access the dashboard directly at: https://localhost/Dashboard

Navigate to Dashboard → Onboard Employee to explore the Multi-Step Employee Onboarding Form

Features of Employee Onboarding

Multi-Step Wizard Form (5 steps: Personal, Employment, Bank & Identity, Emergency Contacts, Review & Submit)

Dynamic Fields & Conditional Logic

Show spouse name if marital status = Married

Add/remove multiple identity proofs and emergency contacts

Validation & UX Enhancements

Field-level validation using Yup

Scroll to first error on invalid input

Data persists on refresh

Reset form functionality

Progress bar and step indicators

Notes

This onboarding module is integrated into the existing Employee Management System, showcasing a practical approach to extending features in a full-stack project.

For a live demo, no login is required due to temporarily disabled protected routes.
