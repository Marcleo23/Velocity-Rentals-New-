# Software Requirements Specification (SRS) - Velocity Car Rentals

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a detailed description of the software requirements for the **Velocity Car Rentals** application. It will outline the functional and non-functional requirements, the user interface, and the system's overall architecture.

### 1.2 Scope
Velocity Car Rentals is a premium car rental platform designed to streamline the process of renting vehicles. The application provides a user-friendly interface for customers to browse a fleet of vehicles, manage bookings, and maintain their profiles. For administrators, it offers a comprehensive dashboard to manage the vehicle fleet, monitor bookings, and oversee user accounts.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification
- **SPA**: Single Page Application
- **Firebase**: A platform developed by Google for creating mobile and web applications.
- **Firestore**: A NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.

---

## 2. Overall Description

### 2.1 Product Perspective
Velocity is a standalone web application built using React and powered by Firebase for backend services (Authentication and Firestore). It is designed to be highly responsive, providing a seamless experience across desktop and mobile devices.

### 2.2 Product Functions
- **User Authentication**: Secure sign-up, sign-in, and sign-out functionality.
- **Fleet Browsing**: Users can view a list of available cars with detailed specifications.
- **Booking Management**: Users can book cars for specific dates and view their booking history.
- **Admin Dashboard**: Administrators can add, edit, or remove cars, manage all user bookings, and update user roles.
- **Profile Management**: Users can update their personal information, including display name, phone number, and bio.
- **Real-time Updates**: Data is synchronized in real-time using Firestore's `onSnapshot` listeners.

### 2.3 User Classes and Characteristics
- **Guest**: Unauthenticated users who can browse the fleet but cannot make bookings.
- **Registered User**: Authenticated users who can book vehicles and manage their profiles.
- **Administrator**: Users with elevated privileges who can manage the entire platform.

### 2.4 Operating Environment
- **Client**: Modern web browsers (Chrome, Firefox, Safari, Edge).
- **Server**: Cloud-hosted environment (Cloud Run).
- **Database**: Firebase Firestore.

### 2.5 Design and Implementation Constraints
- The application must use **TypeScript** for type safety.
- Styling must be implemented using **Tailwind CSS**.
- Icons must be sourced from **Lucide-React**.
- Animations must use **Motion**.

---

## 3. System Features

### 3.1 Authentication
- **Description**: Allows users to create accounts and log in securely.
- **Functional Requirements**:
    - Sign up with email and password.
    - Sign in with existing credentials.
    - Persistent login sessions.
    - Role-based access control (User vs. Admin).

### 3.2 Fleet Management
- **Description**: Displaying and managing the vehicle inventory.
- **Functional Requirements**:
    - Display car cards with image, make, model, year, and price.
    - Detailed view of car specifications (transmission, fuel type, seats, features).
    - Status tracking (Available, Rented, Maintenance).
    - (Admin) Add, Edit, and Delete vehicle entries.

### 3.3 Booking System
- **Description**: Enabling users to rent vehicles for specific durations.
- **Functional Requirements**:
    - Date range selection for rentals.
    - Automatic total price calculation based on daily rates.
    - Booking status tracking (Pending, Confirmed, Cancelled, Completed).
    - (User) View personal booking history.
    - (Admin) View and update status of all bookings.

### 3.4 Admin Dashboard
- **Description**: Centralized management for platform administrators.
- **Functional Requirements**:
    - Fleet overview and management.
    - Global booking monitoring.
    - User management (viewing users and updating roles).
    - Revenue and booking analytics (visualized via charts).

### 3.5 Profile Management
- **Description**: Allowing users to maintain their identity on the platform.
- **Functional Requirements**:
    - Update display name, phone number, and bio.
    - View account details.

---

## 4. External Interface Requirements

### 4.1 User Interfaces
- **Responsive Design**: The UI adapts to different screen sizes.
- **Mobile Menu**: A full-width, 92vh height pull-down menu for mobile navigation.
- **Dark Mode**: Support for light and dark themes.
- **Modals**: Used for authentication, car details, and booking confirmations.

### 4.2 Software Interfaces
- **Firebase Auth**: For user identity management.
- **Firebase Firestore**: For data persistence and real-time synchronization.
- **Recharts**: For data visualization in the admin dashboard.

---

## 5. Non-functional Requirements

### 5.1 Performance Requirements
- The application should load within 2 seconds on a standard broadband connection.
- Real-time updates should reflect in the UI within 500ms of a database change.

### 5.2 Security Requirements
- All database access must be governed by **Firestore Security Rules**.
- User passwords must be handled securely by Firebase Auth.
- Admin-only routes and actions must be protected on both client and server sides.

### 5.3 Software Quality Attributes
- **Usability**: Intuitive navigation and clear feedback for user actions.
- **Maintainability**: Modular component structure and typed data models.
- **Reliability**: Graceful handling of network errors and invalid inputs.

---

## 6. Other Requirements
- **Legal**: Terms and conditions for car rentals must be accessible (placeholder for now).
- **Localization**: Currently supports English; architecture should allow for future i18n implementation.
