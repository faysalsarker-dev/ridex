# 🚖 Ride Booking Platform – Frontend (React + Redux Toolkit + RTK Query)

## 🧭 Project Overview

### 🎯 Key Features
- **Role-Based Access:** Separate dashboards and features for Rider, Driver, and Admin.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
- **Modern UI/UX:** Built using Tailwind CSS and Radix UI components.
- **State Management:** Powered by Redux Toolkit and RTK Query.
- **Authentication:** JWT-based login and registration with persistent sessions.
- **Realistic Data:** All pages populated with real-world structured data, not placeholders.
- **Performance Optimized:** Lazy loading, skeleton loaders, and accessibility-compliant components.

---

## 🧩 Core Functionalities

### 🌍 Public Pages
- **Home:** Hero banner, service overview, user feedback, and call-to-action sections.  
- **About Us:** Company background, mission, and team profiles.  
- **Features:** Details of Rider, Driver, and Admin features.  
- **Contact:** Validated inquiry form (mock submission).  
- **FAQ:** Searchable list of common questions.  

### 🔐 Authentication
- JWT-based login and registration with **role selection (Rider/Driver/Admin)**  
- Persistent authentication state  
- Logout and session handling  
- Optional OAuth login (Google/Facebook)  
- Status handling for **blocked/suspended users** and **offline drivers**

### 🚘 Rider Dashboard
- Request rides with pickup, destination, fare estimation, and payment method  
- View **ride history** with filters and pagination  
- See **ride details** (timestamps, driver info, map route)  
- Manage profile (edit name, phone, password)

### 🚗 Driver Dashboard
- Online/Offline toggle  
- Accept or reject ride requests  
- Manage active rides with real-time status updates  
- Earnings overview with **charts (daily, weekly, monthly)**  
- Ride history and profile management  

### 🛠️ Admin Dashboard
- Manage riders and drivers (approve, suspend, block/unblock)  
- View and filter all rides  
- Analytics with **Recharts visualizations**  
- Profile and password management  

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React + Vite |
| **Language** | TypeScript |
| **Routing** | React Router v7 |
| **State Management** | Redux Toolkit + RTK Query |
| **Styling** | Tailwind CSS + Radix UI |
| **Charts & Visualization** | Recharts |
| **Animations** | Framer Motion |
| **Forms & Validation** | React Hook Form + Zod |
| **Notifications** | React Hot Toast |
| **Maps (optional)** | React Leaflet |
| **Icons** | Lucide React + React Icons |

---

## 🧱 Folder Structure

Here’s the clean and scalable folder structure used in this project 👇

src/
├── hooks/               # Custom React hooks
├── layouts/             # Shared layout components (Navbar, Footer, etc.)
├── redux/               # All Redux-related code (store, slices, API setup)
├── components/          # Reusable UI components (module-based pattern)
├── pages/               # Page-level components (Public, Rider, Driver, Admin)
├── routes/              # Route protection and role-based routing logic
├── utils/               # Helper functions and constants
├── App.tsx              # Main application entry
└── main.tsx             # Vite entry point



---

## ⚙️ Getting Started

Follow these steps to clone and run the project locally 👇

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/faysalsarker-dev/ridex.git
cd ridex


npm install
# or
yarn install
# or
pnpm install


VITE_API_BASE_URL=https://your-backend-api.com/api/v1


npm run dev
