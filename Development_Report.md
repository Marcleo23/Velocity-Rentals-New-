# Velocity Car Rentals - Development Report

This document provides a summary of the core features implemented in the Velocity Car Rentals application, including code snippets and brief explanations for each module.

---

## 1. User Authentication (Signup)

The authentication system is built using **Firebase Authentication**. It allows users to create accounts with their email, password, and additional profile information (username, full name, bio, phone number).

### Code Snippet (`src/components/AuthModal.tsx`)

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    if (isLogin) {
      // Login logic
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Signup logic
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase profile
      await updateFirebaseProfile(user, { displayName: fullName });

      // Create Firestore profile document
      const profileData = {
        uid: user.uid,
        email,
        username: username.toLowerCase(),
        displayName: fullName,
        bio,
        phoneNumber,
        role: email === 'admin@example.com' ? 'admin' : 'user'
      };

      await setDoc(doc(db, 'users', user.uid), profileData);
    }
    onClose();
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Explanation
- **Firebase Auth**: Used for secure credential management.
- **Firestore Integration**: After a successful signup, a corresponding document is created in the `users` collection to store extended profile data.
- **Role-Based Access**: The system assigns a `role` (user or admin) based on the email address during signup.

---

## 2. Admin Panel

The Admin Panel provides a centralized interface for managing the fleet, monitoring bookings, and overseeing user accounts.

### Code Snippet (`src/components/AdminDashboard.tsx`)

```tsx
export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  cars, bookings, users, onAddCar, onUpdateCar, onDeleteCar, onUpdateBookingStatus 
}) => {
  const [activeTab, setActiveTab] = useState('fleet');

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Management Console</h1>
      
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveTab('fleet')}>Fleet</button>
        <button onClick={() => setActiveTab('pending')}>Pending Bookings</button>
        <button onClick={() => setActiveTab('users')}>Users</button>
      </div>

      {/* Fleet Management Table */}
      {activeTab === 'fleet' && (
        <table>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>{car.make} {car.model}</td>
                <td>{car.status}</td>
                <td>
                  <button onClick={() => onUpdateCar(car.id, { status: 'maintenance' })}>Edit</button>
                  <button onClick={() => onDeleteCar(car.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
```

### Explanation
- **State Management**: Uses React `useState` to toggle between different management views (Fleet, Bookings, Users).
- **CRUD Operations**: Admins can perform Create, Read, Update, and Delete operations on the vehicle fleet.
- **Real-time Monitoring**: The dashboard displays live counts of total vehicles, bookings, and customers.

---

## 3. Image Upload

The application supports local image uploads for user profiles. It uses the `FileReader` API to convert images into Base64 strings for storage in Firestore.

### Code Snippet (`src/components/Profile.tsx`)

```tsx
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Limit file size to 800KB
    if (file.size > 800 * 1024) {
      setError('Image size must be less than 800KB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      // Set the Base64 string to the form state
      setFormData(prev => ({ ...prev, photoURL: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }
};
```

### Explanation
- **FileReader API**: Converts the selected file into a `DataURL` (Base64), which can be directly assigned to an `<img>` tag's `src` attribute.
- **Validation**: Includes a size check to prevent large uploads that could exceed Firestore document limits (1MB).
- **User Experience**: Provides an instant preview of the selected image before saving.

---

## 4. Booking System

The booking system allows users to select dates and calculate the total price based on the car's daily rate.

### Code Snippet (`src/components/BookingModal.tsx`)

```tsx
const calculateTotal = () => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate difference in days
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  
  return diffDays * car.pricePerDay;
};

const handleConfirm = () => {
  const totalPrice = calculateTotal();
  onConfirm({ startDate, endDate, totalPrice });
};
```

### Explanation
- **Date Calculation**: Uses JavaScript `Date` objects to determine the rental duration in days.
- **Dynamic Pricing**: The total amount is updated in real-time as the user changes the pickup or return dates.
- **Validation**: The "Confirm Booking" button is disabled until valid dates are selected and a positive total price is calculated.

---

## Conclusion

The Velocity Car Rentals platform demonstrates a full-stack integration using **React** for the frontend and **Firebase** for the backend. The combination of real-time data synchronization, secure authentication, and a responsive UI provides a professional-grade experience for both customers and administrators.
