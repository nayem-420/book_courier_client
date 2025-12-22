# BookCourier – Library-to-Home Delivery System

## Project Overview
BookCourier is a library delivery management system that allows users to request book pickup or delivery from nearby libraries. It helps students, researchers, and book lovers borrow and return books without physically visiting the library. The system ensures a seamless library-to-home book experience.

## Live Demo
https://book-courier-auth.web.app

## Key Features

### General Features
- User-friendly interface with responsive design for all devices.
- Navbar with logo, links (Home, Books, Dashboard, Login/Register), user profile image, hamburger menu for mobile, and theme toggle (light/dark mode).
- Footer with quick links, contact details, social icons (with X logo), and copyright text.
- Homepage includes banner with 3 sliders, latest books section, coverage map, and "Why Choose BookCourier" section.
- At least 1 animated section and 2 extra well-designed sections for better UX.

### Authentication System
- Email/password login and Google social login.
- Registration with name, email, password (strong validation), and profile image upload.
- Profile picture updates automatically after registration.

### Books & Orders
- All Books page: card layout displaying books added by librarians.
- Book Details page: detailed book info, “Order Now” modal with user info, phone, address, and “Place Order” button.
- Orders are tracked with status: pending → shipped → delivered; payment status: unpaid/paid.
- Users can cancel pending orders or pay for pending orders.
- Librarians can add/edit books, change order statuses, and manage their books.

### Dashboard
#### User Dashboard
- My Orders: view all orders with status and action buttons (Cancel, Pay Now).
- My Profile: update profile info.
- Invoices: view payment history with optional book names.

#### Librarian Dashboard
- Add Book: form with book name, image, author, price, and status (published/unpublished).
- My Books: view all added books, edit info, and unpublished books are hidden from users.
- Orders: manage orders, cancel if needed, change order status.

#### Admin Dashboard
- All Users: view users and promote them to librarian/admin.
- Manage Books: publish/unpublish or delete books added by librarians.
- My Profile: same as user dashboard.

### Additional Features
- Book Wishlist: users can add books to wishlist and view them in My Wishlist.
- Review & Rating: users can review or rate books they ordered.
- Search & Sort: search books by name and sort by price.
- JWT token verification for protected routes.
- Optionally: TanStack Query for data fetching, skeleton loaders, dark/light mode with TailwindCSS.

## Tech Stack & Tools
- Frontend: React, TailwindCSS, optional ShadCN/Chakra UI/Material UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: Firebase (secure keys using environment variables)
- Hosting/Deployment: Netlify / Vercel / Surge

## Environment Variables
- `.env` file for securing Firebase config and MongoDB credentials.
- Example:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
MONGODB_URI=your_mongodb_uri
