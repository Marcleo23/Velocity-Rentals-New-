# Velocity Car Rentals - Codebase Overview

This document provides an easy-to-understand explanation of how the Velocity Car Rentals application is built and how its different parts work together.

---

## 1. The Big Picture (Architecture)

Velocity is a **Full-Stack Web Application** built with a modern "Serverless" architecture. This means:
- **Frontend (The Face)**: Built with **React**, which handles everything the user sees and interacts with.
- **Backend (The Brain)**: Powered by **Firebase**, which manages user accounts (Authentication) and stores all data (Firestore Database).
- **Styling**: Uses **Tailwind CSS** for a fast, responsive, and modern design.

---

## 2. Core Technologies

- **React 19**: The foundation of the user interface.
- **Firebase**:
    - **Authentication**: Handles secure logins and signups.
    - **Firestore**: A real-time database that syncs data across all users instantly.
- **TypeScript**: Ensures the code is reliable by catching errors during development.
- **Lucide-React**: Provides the beautiful icons used throughout the app.
- **Motion**: Powers the smooth animations and transitions.
- **Recharts**: Used for the data visualizations in the Admin Dashboard.

---

## 3. Project Structure & Key Files

### `src/App.tsx` (The Controller)
This is the most important file. It acts as the "brain" of the frontend:
- **State Management**: It keeps track of the current user, the list of cars, and all bookings.
- **Real-time Sync**: It sets up "listeners" that watch the Firebase database. If an admin adds a car or a user makes a booking, the UI updates automatically without refreshing.
- **Routing**: It decides which page to show (Home, Profile, Admin, etc.) based on the user's actions.

### `src/firebase.ts` (The Bridge)
This file connects the React app to the Firebase cloud services. It initializes the database and authentication tools using the configuration found in `firebase-applet-config.json`.

### `src/types.ts` (The Blueprint)
Defines the "shape" of our data. For example, it specifies that a `Car` must have a `make`, `model`, `pricePerDay`, and `status`. This prevents bugs by ensuring we always use the correct data format.

---

## 4. Key Components (The Building Blocks)

### `Navbar.tsx`
The navigation bar at the top. It changes based on whether you are logged in and if you are an admin. It also includes the theme toggle (Light/Dark mode) and the mobile menu.

### `AuthModal.tsx`
The popup window for signing in or creating an account. It handles the logic for checking if a username is taken and creating the user's profile in the database.

### `CarCard.tsx` & `CarModal.tsx`
- **CarCard**: Displays an individual vehicle's summary on the home page.
- **CarModal**: A detailed form used by admins to add or edit vehicles. It includes the image upload logic.

### `BookingModal.tsx`
The interface where users select their rental dates. It calculates the total price in real-time based on the duration of the stay.

### `AdminDashboard.tsx`
A powerful control center for administrators. It allows them to:
- Manage the fleet (Add/Edit/Delete cars).
- Monitor all bookings and change their status (Confirm/Cancel).
- Manage user accounts and roles.
- View business analytics through charts.

---

## 5. How Data Flows

1.  **User Action**: A user clicks "Book Now" and confirms their dates.
2.  **Database Update**: The app sends a request to **Firebase Firestore** to create a new "booking" document.
3.  **Real-time Update**: Because `App.tsx` is "listening" to the bookings collection, it sees the new document immediately.
4.  **UI Refresh**: The user's "My Bookings" page and the Admin's dashboard both update instantly to show the new booking.

---

## 6. Styling & User Experience

- **Responsive Design**: The app is built to look great on phones, tablets, and desktops.
- **Dark Mode**: Users can switch themes, and the app remembers their preference using a "Theme Context."
- **Animations**: We use `motion` to make modals fade in and lists slide smoothly, giving the app a premium, high-end feel.

---

## Conclusion

Velocity Car Rentals is designed to be **fast, secure, and easy to maintain**. By combining the power of React with the real-time capabilities of Firebase, we've created a platform that feels modern and professional.
